import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { JsonLdScript } from "~/components/json-ld-script";
import { RolesBoard } from "~/components/roles-board";
import { SectionWrapper } from "~/components/section-wrapper";
import { StampedReceipt } from "~/components/stamped-receipt";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  availabilityOptions,
  joinNetworkSchema,
  projectTypeOptions,
  regionOptions,
  roleOptions,
  type JoinNetworkValues,
} from "~/lib/forms";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import {
  saveFormSubmission,
  sendSubmissionNotification,
  toStringArray,
  toStringValue,
  uploadResumeIfPresent,
} from "~/lib/submissions.server";
import type { Route } from "./+types/join-our-network";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Energy Construction Jobs | Join CrewVolt",
    description:
      "Experienced energy construction professionals: join CrewVolt's network for consistent W-2 contract work on substations, wind, solar, and transmission projects.",
    path: "/join-our-network",
  });
}

export function links() {
  return canonicalLinks("/join-our-network");
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  const parsed = joinNetworkSchema.safeParse({
    name: toStringValue(formData.get("name")),
    email: toStringValue(formData.get("email")),
    phone: toStringValue(formData.get("phone")),
    cityState: toStringValue(formData.get("cityState")),
    rolesHeld: toStringArray(formData.getAll("rolesHeld")),
    projectTypesWorked: toStringArray(formData.getAll("projectTypesWorked")),
    yearsExperience: toStringValue(formData.get("yearsExperience")),
    regions: toStringArray(formData.getAll("regions")),
    currentAvailability: toStringValue(formData.get("currentAvailability")) || undefined,
    certifications: toStringValue(formData.get("certifications")),
    notes: toStringValue(formData.get("notes")),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the form fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const env = context.cloudflare.env;

  try {
    const resumeEntry = formData.get("resume");
    const resumeFile = resumeEntry instanceof File ? resumeEntry : null;
    const resumeKey = await uploadResumeIfPresent(env, resumeFile);

    const payload = { ...parsed.data, resumeKey };
    await saveFormSubmission(env, "join_network", payload, parsed.data.email);
    await sendSubmissionNotification(env, {
      subject: "New Join Our Network submission",
      submitterName: parsed.data.name,
      submitterEmail: parsed.data.email,
      summaryLines: [
        parsed.data.yearsExperience ? `Years experience: ${parsed.data.yearsExperience}` : "",
        parsed.data.currentAvailability
          ? `Availability: ${parsed.data.currentAvailability}`
          : "",
        parsed.data.rolesHeld?.length ? `Roles: ${parsed.data.rolesHeld.join(", ")}` : "",
        `Resume uploaded: ${resumeKey ? "yes" : "no"}`,
      ].filter(Boolean),
      payload,
    });
    return {
      ok: true,
      message:
        "Thank you. We will review your information and reach out to schedule a conversation.",
    };
  } catch {
    return {
      ok: false,
      message: "We could not process your request. Please try again.",
    };
  }
}

export default function JoinOurNetworkRoute() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [showOptional, setShowOptional] = useState(false);

  const form = useForm<JoinNetworkValues>({
    resolver: zodResolver(joinNetworkSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cityState: "",
      rolesHeld: [],
      projectTypesWorked: [],
      yearsExperience: "",
      regions: [],
      currentAvailability: undefined,
      certifications: "",
      notes: "",
    },
  });

  const { errors } = form.formState;

  useEffect(() => {
    if (!actionData) return;
    if (actionData.ok) {
      toast.success(actionData.message);
      form.reset();
    } else {
      toast.error(actionData.message);
    }
  }, [actionData, form]);

  const onSubmit = form.handleSubmit((_, event) => {
    const target = event?.currentTarget;
    if (target) submit(target, { method: "post", encType: "multipart/form-data" });
  });

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Energy Infrastructure Field Professionals",
    description:
      "CrewVolt is building a network of experienced inspectors, superintendents, project managers, and QA/QC professionals for W-2 contract assignments on substation, wind, solar, BESS, and transmission projects.",
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "CrewVolt",
      sameAs: "https://crewvolt.com",
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressRegion: "TN", addressCountry: "US" },
    },
    industry: "Energy Infrastructure Construction",
    datePosted: "2026-04-15",
  };

  if (actionData?.ok) {
    return (
      <SectionWrapper tone="vellum" eyebrow="Initial intake — crew" badge="Sheet E-008">
        <StampedReceipt
          sheet="E-008"
          title="Network intake received."
          message="We will review your information and reach out to schedule a conversation. While you wait, see what we are currently filling below."
        />
        <div className="mt-12">
          <RolesBoard hideApply />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      <JsonLdScript data={jobPostingSchema} />

      <SectionWrapper tone="vellum" eyebrow="Initial intake — crew" badge="Sheet E-008 / SHT 1 of 2">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
              Your experience has value.
              <em className="cv-display-italic"> We have the projects.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
              You have field experience on energy infrastructure projects and you want
              consistent contract work with fair pay and W-2 employment. The{" "}
              <a
                href="https://www.energy.gov/policy/us-energy-employment-jobs-report-useer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
              >
                DOE reports
              </a>{" "}
              growing demand. Send us the basics — we will reach out.
            </p>
            <div className="mt-10">
              <RolesBoard hideApply />
            </div>
          </div>

          <div className="cv-paper-flat self-start">
            <div className="border-b border-cv-pencil px-5 py-3">
              <p className="cv-slug-copper">Required — 3 fields</p>
            </div>
            <Form {...form}>
              <form
                className="space-y-5 p-5 md:p-7"
                onSubmit={onSubmit}
                encType="multipart/form-data"
              >
                <label className="block">
                  <span className="cv-form-label">A1 — Your name</span>
                  <Input className="cv-input" {...form.register("name")} />
                  {errors.name ? (
                    <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                      {errors.name.message}
                    </p>
                  ) : null}
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="cv-form-label">A2 — Email</span>
                    <Input className="cv-input" type="email" {...form.register("email")} />
                    {errors.email ? (
                      <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </label>
                  <label className="block">
                    <span className="cv-form-label">A3 — Phone</span>
                    <Input className="cv-input" {...form.register("phone")} />
                    {errors.phone ? (
                      <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                        {errors.phone.message}
                      </p>
                    ) : null}
                  </label>
                </div>

                <details
                  className="border-t border-cv-rule-soft pt-5"
                  open={showOptional}
                  onToggle={(e) => setShowOptional((e.target as HTMLDetailsElement).open)}
                >
                  <summary className="cv-mono cursor-pointer list-none text-[10px] font-semibold uppercase tracking-[0.22em] text-cv-copper">
                    {showOptional ? "− Hide" : "+ Add"} optional crew detail
                  </summary>
                  <div className="mt-5 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="block">
                        <span className="cv-form-label">A4 — City / state</span>
                        <Input className="cv-input" {...form.register("cityState")} />
                      </label>
                      <label className="block">
                        <span className="cv-form-label">A5 — Years experience</span>
                        <Input
                          className="cv-input"
                          inputMode="numeric"
                          {...form.register("yearsExperience")}
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="cv-form-label">A6 — Current availability</span>
                      <select
                        className="cv-input"
                        defaultValue=""
                        {...form.register("currentAvailability")}
                      >
                        <option value="">Select…</option>
                        {availabilityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="cv-form-label">A7 — Resume (PDF or Word)</span>
                      <Input
                        className="cv-input"
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>

                    <fieldset>
                      <legend className="cv-form-label">A8 — Roles you have held</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {roleOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex min-h-11 items-center gap-2 border border-cv-rule-soft bg-cv-vellum px-3 py-2 text-sm text-cv-pencil"
                          >
                            <input
                              type="checkbox"
                              value={option.value}
                              className="size-4 accent-cv-copper"
                              {...form.register("rolesHeld")}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="cv-form-label">A9 — Project types worked</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {projectTypeOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex min-h-11 items-center gap-2 border border-cv-rule-soft bg-cv-vellum px-3 py-2 text-sm text-cv-pencil"
                          >
                            <input
                              type="checkbox"
                              value={option.value}
                              className="size-4 accent-cv-copper"
                              {...form.register("projectTypesWorked")}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="cv-form-label">A10 — Regions willing to work</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {regionOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex min-h-11 items-center gap-2 border border-cv-rule-soft bg-cv-vellum px-3 py-2 text-sm text-cv-pencil"
                          >
                            <input
                              type="checkbox"
                              value={option.value}
                              className="size-4 accent-cv-copper"
                              {...form.register("regions")}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <label className="block">
                      <span className="cv-form-label">A11 — Certifications / licenses</span>
                      <Textarea
                        className="cv-input"
                        rows={3}
                        {...form.register("certifications")}
                      />
                    </label>
                    <label className="block">
                      <span className="cv-form-label">A12 — Notes</span>
                      <Textarea className="cv-input" rows={4} {...form.register("notes")} />
                    </label>
                  </div>
                </details>

                <div className="border-t border-cv-rule-soft pt-5">
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                    disabled={navigation.state === "submitting"}
                  >
                    {navigation.state === "submitting" ? "Stamping…" : "Submit intake →"}
                  </Button>
                  <p className="cv-mono mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                    No spam · No 1099 weekend bookkeeping
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <Link
          to="/why-crewvolt"
          className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-copper underline-offset-4 hover:underline"
        >
          See specification matrix on Sheet E-006 →
        </Link>
      </SectionWrapper>
    </>
  );
}

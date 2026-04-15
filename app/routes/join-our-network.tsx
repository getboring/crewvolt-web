import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { JsonLdScript } from "~/components/json-ld-script";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { SectionWrapper } from "~/components/section-wrapper";
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

const fieldClassName =
  "mt-1 w-full rounded-lg border border-cv-border bg-white px-3 py-2 text-sm text-cv-charcoal shadow-sm";

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
    currentAvailability: toStringValue(formData.get("currentAvailability")),
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

    const payload = {
      ...parsed.data,
      resumeKey,
    };

    await saveFormSubmission(env, "join_network", payload, parsed.data.email);

    await sendSubmissionNotification(env, {
      subject: "New Join Our Network submission",
      submitterName: parsed.data.name,
      submitterEmail: parsed.data.email,
      summaryLines: [
        `Years experience: ${parsed.data.yearsExperience}`,
        `Availability: ${parsed.data.currentAvailability}`,
        `Roles: ${parsed.data.rolesHeld.join(", ")}`,
        `Resume uploaded: ${resumeKey ? "yes" : "no"}`,
      ],
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
      currentAvailability: "available_now",
      certifications: "",
      notes: "",
    },
  });

  const { errors } = form.formState;

  useEffect(() => {
    if (!actionData) {
      return;
    }

    if (actionData.ok) {
      toast.success(actionData.message);
      form.reset({
        name: "",
        email: "",
        phone: "",
        cityState: "",
        rolesHeld: [],
        projectTypesWorked: [],
        yearsExperience: "",
        regions: [],
        currentAvailability: "available_now",
        certifications: "",
        notes: "",
      });
    } else {
      toast.error(actionData.message);
    }
  }, [actionData, form]);

  const onSubmit = form.handleSubmit((_, event) => {
    const target = event?.currentTarget;
    if (target) {
      submit(target, { method: "post", encType: "multipart/form-data" });
    }
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
      address: {
        "@type": "PostalAddress",
        addressRegion: "TN",
        addressCountry: "US",
      },
    },
    industry: "Energy Infrastructure Construction",
    datePosted: "2026-04-15",
  };

  return (
    <>
      <JsonLdScript data={jobPostingSchema} />
      <SectionWrapper tone="parchment">
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">
          Your experience has value. We have the projects to prove it.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          You have field experience on energy infrastructure projects and you want consistent contract
          work with fair pay and W-2 employment. The{" "}
          <a href="https://www.energy.gov/policy/us-energy-employment-jobs-report-useer" target="_blank" rel="noopener noreferrer" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">DOE reports</a>{" "}
          growing demand for experienced energy construction professionals. Tell us about yourself.
        </p>

      <div className="mt-8 rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="cv-form-label">Your name</span>
                <Input className={fieldClassName} {...form.register("name")} />
                {errors.name ? <p className="mt-1 text-xs text-cv-danger">{errors.name.message}</p> : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Email</span>
                <Input className={fieldClassName} type="email" {...form.register("email")} />
                {errors.email ? <p className="mt-1 text-xs text-cv-danger">{errors.email.message}</p> : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Phone</span>
                <Input className={fieldClassName} {...form.register("phone")} />
                {errors.phone ? <p className="mt-1 text-xs text-cv-danger">{errors.phone.message}</p> : null}
              </label>

              <label className="block">
                <span className="cv-form-label">City / state</span>
                <Input className={fieldClassName} {...form.register("cityState")} />
                {errors.cityState ? (
                  <p className="mt-1 text-xs text-cv-danger">{errors.cityState.message}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Years of experience in energy construction</span>
                <Input className={fieldClassName} inputMode="numeric" {...form.register("yearsExperience")} />
                {errors.yearsExperience ? (
                  <p className="mt-1 text-xs text-cv-danger">{errors.yearsExperience.message}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Current availability</span>
                <select className={fieldClassName} {...form.register("currentAvailability")}>
                  {availabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="cv-form-label">Resume upload (optional, PDF or Word)</span>
                <Input className={fieldClassName} type="file" name="resume" accept=".pdf,.doc,.docx" />
              </label>
            </div>

            <fieldset>
              <legend className="cv-form-label">Roles you have held</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex min-h-11 items-center gap-2 rounded-md border border-cv-border bg-cv-cream px-3 py-2 text-sm text-cv-charcoal"
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
              {errors.rolesHeld ? (
                <p className="mt-1 text-xs text-cv-danger">{errors.rolesHeld.message}</p>
              ) : null}
            </fieldset>

            <fieldset>
              <legend className="cv-form-label">Project types worked</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {projectTypeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex min-h-11 items-center gap-2 rounded-md border border-cv-border bg-cv-cream px-3 py-2 text-sm text-cv-charcoal"
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
              {errors.projectTypesWorked ? (
                <p className="mt-1 text-xs text-cv-danger">{errors.projectTypesWorked.message}</p>
              ) : null}
            </fieldset>

            <fieldset>
              <legend className="cv-form-label">Regions willing to work</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {regionOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex min-h-11 items-center gap-2 rounded-md border border-cv-border bg-cv-cream px-3 py-2 text-sm text-cv-charcoal"
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
              {errors.regions ? <p className="mt-1 text-xs text-cv-danger">{errors.regions.message}</p> : null}
            </fieldset>

            <label className="block">
              <span className="cv-form-label">Certifications or licenses (optional)</span>
              <Textarea className={fieldClassName} rows={4} {...form.register("certifications")} />
            </label>

            <label className="block">
              <span className="cv-form-label">Anything else</span>
              <Textarea className={fieldClassName} rows={5} {...form.register("notes")} />
            </label>

            <Button type="submit" variant="accent" disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? "Sending..." : "Join the network"}
            </Button>
          </form>
        </Form>
      </div>
    </SectionWrapper>
    </>
  );
}

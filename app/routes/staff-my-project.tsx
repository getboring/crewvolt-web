import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { SectionWrapper } from "~/components/section-wrapper";
import { StampedReceipt } from "~/components/stamped-receipt";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  projectTypeOptions,
  roleOptions,
  sideOptions,
  staffProjectSchema,
  type StaffProjectValues,
} from "~/lib/forms";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import {
  saveFormSubmission,
  sendSubmissionNotification,
  toStringArray,
  toStringValue,
} from "~/lib/submissions.server";
import type { Route } from "./+types/staff-my-project";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Staff Your Project | Hire Energy Pros | CrewVolt",
    description:
      "Need inspectors, superintendents, or project managers for your energy construction project? CrewVolt sources experienced professionals from our vetted network.",
    path: "/staff-my-project",
  });
}

export function links() {
  return canonicalLinks("/staff-my-project");
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  const parsed = staffProjectSchema.safeParse({
    yourName: toStringValue(formData.get("yourName")),
    companyName: toStringValue(formData.get("companyName")),
    email: toStringValue(formData.get("email")),
    phone: toStringValue(formData.get("phone")),
    projectName: toStringValue(formData.get("projectName")),
    projectLocation: toStringValue(formData.get("projectLocation")),
    projectType: toStringValue(formData.get("projectType")) || undefined,
    projectSide: toStringValue(formData.get("projectSide")) || undefined,
    rolesNeeded: toStringArray(formData.getAll("rolesNeeded")),
    anticipatedStartDate: toStringValue(formData.get("anticipatedStartDate")),
    estimatedDuration: toStringValue(formData.get("estimatedDuration")),
    additionalDetails: toStringValue(formData.get("additionalDetails")),
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
    await saveFormSubmission(env, "staff_project", parsed.data, parsed.data.email);
    await sendSubmissionNotification(env, {
      subject: "New Staff My Project submission",
      submitterName: parsed.data.yourName,
      submitterEmail: parsed.data.email,
      summaryLines: [
        `Company: ${parsed.data.companyName}`,
        parsed.data.projectType ? `Project type: ${parsed.data.projectType}` : "",
        parsed.data.projectSide ? `Project side: ${parsed.data.projectSide}` : "",
        parsed.data.rolesNeeded?.length
          ? `Roles needed: ${parsed.data.rolesNeeded.join(", ")}`
          : "",
      ].filter(Boolean),
      payload: parsed.data,
    });
    return {
      ok: true,
      message:
        "Thank you. We will review your project details and reach out within one business day.",
    };
  } catch {
    return {
      ok: false,
      message: "We could not process your request. Please try again.",
    };
  }
}

export default function StaffMyProjectRoute() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [showOptional, setShowOptional] = useState(false);

  const form = useForm<StaffProjectValues>({
    resolver: zodResolver(staffProjectSchema),
    defaultValues: {
      yourName: "",
      companyName: "",
      email: "",
      phone: "",
      projectName: "",
      projectLocation: "",
      projectType: undefined,
      projectSide: undefined,
      rolesNeeded: [],
      anticipatedStartDate: "",
      estimatedDuration: "",
      additionalDetails: "",
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
    if (target) submit(target, { method: "post" });
  });

  if (actionData?.ok) {
    return (
      <SectionWrapper tone="vellum" eyebrow="Initial intake — owner" badge="Sheet E-007">
        <StampedReceipt
          sheet="E-007"
          title="Project intake received."
          message="We will review your project details and reach out within one business day to talk through scope, location, roles, and timeline. If urgent, call +1 (423) 555-0100."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/">Return to cover →</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services">View scope of work →</Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper tone="vellum" eyebrow="Initial intake — owner / EPC" badge="Sheet E-007 / SHT 1 of 2">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
            Tell us about
            <em className="cv-display-italic"> your project.</em>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
            You have a project that needs experienced leadership or inspection professionals.
            Send the basics and we will start matching people from our network. We reply within
            one business day.
          </p>
          <div className="mt-8 cv-paper-flat self-start">
            <div className="border-b border-cv-pencil px-5 py-3">
              <p className="cv-slug-copper">What happens next</p>
            </div>
            <ol className="divide-y divide-cv-rule-soft text-sm">
              {[
                "We acknowledge receipt within one business day.",
                "We schedule a 15-minute scoping call to align on roles and timing.",
                "We surface candidate matches from our active network within ~5 days.",
              ].map((step, i) => (
                <li key={step} className="grid grid-cols-[40px_1fr] gap-3 px-5 py-3">
                  <span className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-cv-graphite">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="cv-paper-flat">
          <div className="border-b border-cv-pencil px-5 py-3">
            <p className="cv-slug-copper">Required — 4 fields</p>
          </div>
          <Form {...form}>
            <form className="space-y-5 p-5 md:p-7" onSubmit={onSubmit}>
              <label className="block">
                <span className="cv-form-label">A1 — Your name</span>
                <Input className="cv-input" {...form.register("yourName")} />
                {errors.yourName ? (
                  <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                    {errors.yourName.message}
                  </p>
                ) : null}
              </label>

              <label className="block">
                <span className="cv-form-label">A2 — Company</span>
                <Input className="cv-input" {...form.register("companyName")} />
                {errors.companyName ? (
                  <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                    {errors.companyName.message}
                  </p>
                ) : null}
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="cv-form-label">A3 — Email</span>
                  <Input className="cv-input" type="email" {...form.register("email")} />
                  {errors.email ? (
                    <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                      {errors.email.message}
                    </p>
                  ) : null}
                </label>
                <label className="block">
                  <span className="cv-form-label">A4 — Phone</span>
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
                  {showOptional ? "− Hide" : "+ Add"} optional project detail
                </summary>
                <div className="mt-5 space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="cv-form-label">A5 — Project name</span>
                      <Input className="cv-input" {...form.register("projectName")} />
                    </label>
                    <label className="block">
                      <span className="cv-form-label">A6 — Project location</span>
                      <Input
                        className="cv-input"
                        placeholder="City, State"
                        {...form.register("projectLocation")}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="cv-form-label">A7 — Project type</span>
                      <select
                        className="cv-input"
                        defaultValue=""
                        {...form.register("projectType")}
                      >
                        <option value="">Select…</option>
                        {projectTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="cv-form-label">A8 — Which side</span>
                      <select
                        className="cv-input"
                        defaultValue=""
                        {...form.register("projectSide")}
                      >
                        <option value="">Select…</option>
                        {sideOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <fieldset>
                    <legend className="cv-form-label">A9 — Roles needed</legend>
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
                            {...form.register("rolesNeeded")}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="cv-form-label">A10 — Anticipated start</span>
                      <Input
                        className="cv-input"
                        type="date"
                        {...form.register("anticipatedStartDate")}
                      />
                    </label>
                    <label className="block">
                      <span className="cv-form-label">A11 — Estimated duration</span>
                      <Input className="cv-input" {...form.register("estimatedDuration")} />
                    </label>
                  </div>

                  <label className="block">
                    <span className="cv-form-label">A12 — Additional notes</span>
                    <Textarea
                      className="cv-input"
                      rows={4}
                      {...form.register("additionalDetails")}
                    />
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
                  Reply ≤ 1 business day · Match ≤ 5 days
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </SectionWrapper>
  );
}

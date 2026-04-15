import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { SectionWrapper } from "~/components/section-wrapper";
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

const fieldClassName =
  "mt-1 w-full rounded-lg border border-cv-border bg-white px-3 py-2 text-sm text-cv-charcoal shadow-sm";

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
    projectType: toStringValue(formData.get("projectType")),
    projectSide: toStringValue(formData.get("projectSide")),
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
        `Project type: ${parsed.data.projectType}`,
        `Project side: ${parsed.data.projectSide}`,
        `Roles needed: ${parsed.data.rolesNeeded.join(", ")}`,
      ],
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

  const form = useForm<StaffProjectValues>({
    resolver: zodResolver(staffProjectSchema),
    defaultValues: {
      yourName: "",
      companyName: "",
      email: "",
      phone: "",
      projectName: "",
      projectLocation: "",
      projectType: "substation",
      projectSide: "owner_utility",
      rolesNeeded: [],
      anticipatedStartDate: "",
      estimatedDuration: "",
      additionalDetails: "",
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
        yourName: "",
        companyName: "",
        email: "",
        phone: "",
        projectName: "",
        projectLocation: "",
        projectType: "substation",
        projectSide: "owner_utility",
        rolesNeeded: [],
        anticipatedStartDate: "",
        estimatedDuration: "",
        additionalDetails: "",
      });
    } else {
      toast.error(actionData.message);
    }
  }, [actionData, form]);

  const onSubmit = form.handleSubmit((_, event) => {
    const target = event?.currentTarget;
    if (target) {
      submit(target, { method: "post" });
    }
  });

  return (
    <SectionWrapper tone="parchment">
      <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">
        Tell us about your project.
      </h1>
      <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
        You have a project that needs experienced leadership or inspection professionals. Tell us
        about it and we will start matching people from our network. Not sure which roles you need? Review our <Link to="/services" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">full services list</Link>.
      </p>

      <div className="mt-8 rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="cv-form-label">Your name</span>
                <Input className={fieldClassName} {...form.register("yourName")} />
                {errors.yourName ? <p className="mt-1 text-xs text-cv-danger">{errors.yourName.message}</p> : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Company name</span>
                <Input className={fieldClassName} {...form.register("companyName")} />
                {errors.companyName ? (
                  <p className="mt-1 text-xs text-cv-danger">{errors.companyName.message}</p>
                ) : null}
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
                <span className="cv-form-label">Project name (optional)</span>
                <Input className={fieldClassName} {...form.register("projectName")} />
              </label>

              <label className="block">
                <span className="cv-form-label">Project location</span>
                <Input className={fieldClassName} {...form.register("projectLocation")} />
                {errors.projectLocation ? (
                  <p className="mt-1 text-xs text-cv-danger">{errors.projectLocation.message}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Project type</span>
                <select className={fieldClassName} {...form.register("projectType")}>
                  {projectTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="cv-form-label">Which side</span>
                <select className={fieldClassName} {...form.register("projectSide")}>
                  {sideOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="cv-form-label">Anticipated start date</span>
                <Input className={fieldClassName} type="date" {...form.register("anticipatedStartDate")} />
                {errors.anticipatedStartDate ? (
                  <p className="mt-1 text-xs text-cv-danger">{errors.anticipatedStartDate.message}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="cv-form-label">Estimated duration</span>
                <Input className={fieldClassName} {...form.register("estimatedDuration")} />
                {errors.estimatedDuration ? (
                  <p className="mt-1 text-xs text-cv-danger">{errors.estimatedDuration.message}</p>
                ) : null}
              </label>
            </div>

            <fieldset>
              <legend className="cv-form-label">Roles needed</legend>
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
                      {...form.register("rolesNeeded")}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.rolesNeeded ? (
                <p className="mt-1 text-xs text-cv-danger">{errors.rolesNeeded.message}</p>
              ) : null}
            </fieldset>

            <label className="block">
              <span className="cv-form-label">Additional details</span>
              <Textarea className={fieldClassName} rows={5} {...form.register("additionalDetails")} />
              {errors.additionalDetails ? (
                <p className="mt-1 text-xs text-cv-danger">{errors.additionalDetails.message}</p>
              ) : null}
            </label>

            <Button type="submit" variant="accent" disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? "Sending..." : "Send project details"}
            </Button>
          </form>
        </Form>
      </div>
    </SectionWrapper>
  );
}

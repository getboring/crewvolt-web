import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { FormSuccess } from "~/components/form-success";
import { SectionWrapper } from "~/components/section-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
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

const inputClass =
  "h-11 rounded-md border-cv-border bg-white text-cv-charcoal shadow-sm focus-visible:border-cv-copper focus-visible:ring-cv-copper/30";

const selectClass =
  "h-11 w-full rounded-md border border-cv-border bg-white px-3 text-sm text-cv-charcoal shadow-sm transition-colors focus-visible:border-cv-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-copper/30";

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

  if (toStringValue(formData.get("website"))) {
    return {
      ok: true,
      message:
        "Thank you. We will review your project details and reach out within one business day.",
    };
  }

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
  } catch (err) {
    console.error("staff_project submission failed", err);
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

  useEffect(() => {
    if (!actionData) return;
    if (actionData.ok) {
      toast.success(actionData.message);
      form.reset();
    } else {
      toast.error(actionData.message);
      if ("fieldErrors" in actionData && actionData.fieldErrors) {
        toast.error("Please fix the highlighted fields");
      }
    }
  }, [actionData, form]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.currentTarget;
    form.handleSubmit(() => {
      submit(target, { method: "post" });
    })(event);
  };

  const rolesNeededError = form.formState.errors.rolesNeeded?.message;

  return (
    <SectionWrapper tone="parchment">
      <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
        Tell us about your project.
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-cv-charcoal">
        You have a project that needs experienced leadership or inspection
        professionals. Tell us about it and we will start matching people from
        our network. Not sure which roles you need?{" "}
        <Link
          to="/services"
          className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
        >
          Review our full services list
        </Link>
        .
      </p>

      {actionData?.ok ? (
        <div className="mt-8">
          <FormSuccess
            message={actionData.message}
            secondaryHref="/services"
            secondaryLabel="See all services"
          />
        </div>
      ) : (
      <div className="mt-8 rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={onSubmit}
            aria-label="Staff my project form"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="organization"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input className={inputClass} {...field} />
                    </FormControl>
                    <FormDescription>Optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project location</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="address-level2"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project type</FormLabel>
                    <FormControl>
                      <select className={selectClass} {...field}>
                        {projectTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectSide"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which side</FormLabel>
                    <FormControl>
                      <select className={selectClass} {...field}>
                        {sideOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="anticipatedStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anticipated start date</FormLabel>
                    <FormControl>
                      <Input type="date" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated duration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 12 months"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <fieldset className="grid gap-2">
              <legend className="text-sm font-medium leading-none text-cv-charcoal">
                Roles needed
              </legend>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex min-h-11 items-center gap-2 rounded-md border border-cv-border bg-cv-cream px-3 py-2 text-sm text-cv-charcoal transition-colors hover:border-cv-copper has-[:checked]:border-cv-copper has-[:checked]:bg-white"
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
              {rolesNeededError ? (
                <p className="text-xs text-cv-danger">{rolesNeededError}</p>
              ) : null}
            </fieldset>

            <FormField
              control={form.control}
              name="additionalDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional details</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Anything else we should know"
                      className="rounded-md border-cv-border bg-white text-cv-charcoal shadow-sm focus-visible:border-cv-copper focus-visible:ring-cv-copper/30"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Sending…"
                : "Send project details"}
            </Button>
          </form>
        </Form>
      </div>
      )}
    </SectionWrapper>
  );
}

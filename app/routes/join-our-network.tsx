import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { CurrentlyFilling } from "~/components/currently-filling";
import { FormSuccess } from "~/components/form-success";
import { JsonLdScript } from "~/components/json-ld-script";
import { SectionWrapper } from "~/components/section-wrapper";
import { listOpenRoles } from "~/lib/open-roles.server";
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

const inputClass =
  "h-11 rounded-md border-cv-border bg-white text-cv-charcoal shadow-sm focus-visible:border-cv-copper focus-visible:ring-cv-copper/30";

const selectClass =
  "h-11 w-full rounded-md border border-cv-border bg-white px-3 text-sm text-cv-charcoal shadow-sm transition-colors focus-visible:border-cv-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-copper/30";

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

export async function loader({ context }: Route.LoaderArgs) {
  const openRoles = await listOpenRoles(context.cloudflare.env.DB);
  return { openRoles };
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  if (toStringValue(formData.get("website"))) {
    return {
      ok: true,
      message:
        "Thank you. We will review your information and reach out to schedule a conversation.",
    };
  }

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

    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      return {
        ok: false,
        message: "Resume must be 5 MB or smaller.",
      };
    }

    const resumeKey = await uploadResumeIfPresent(env, resumeFile);

    const payload = { ...parsed.data, resumeKey };
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
  } catch (err) {
    console.error("join_network submission failed", err);
    return {
      ok: false,
      message: "We could not process your request. Please try again.",
    };
  }
}

export default function JoinOurNetworkRoute() {
  const { openRoles } = useLoaderData<typeof loader>();
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
      submit(target, { method: "post", encType: "multipart/form-data" });
    })(event);
  };

  const { errors } = form.formState;

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
    datePosted: new Date().toISOString().slice(0, 10),
  };

  return (
    <>
      <JsonLdScript data={jobPostingSchema} />
      <SectionWrapper tone="parchment">
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Your experience has value. We have the projects to prove it.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-cv-charcoal">
          You have field experience on energy infrastructure projects and you
          want consistent contract work with fair pay and W-2 employment. The{" "}
          <a
            href="https://www.energy.gov/policy/us-energy-employment-jobs-report-useer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            DOE reports
          </a>{" "}
          growing demand for experienced energy construction professionals. Tell
          us about yourself.
        </p>

        <div className="mt-8">
          <CurrentlyFilling roles={openRoles} hideApply />
        </div>

        {actionData?.ok ? (
          <div className="mt-8">
            <FormSuccess
              message={actionData.message}
              secondaryHref="/why-crewvolt"
              secondaryLabel="Why CrewVolt"
            />
          </div>
        ) : (
        <div className="mt-8 rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={onSubmit}
              encType="multipart/form-data"
              aria-label="Join our network form"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="name"
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
                  name="cityState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City / state</FormLabel>
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
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of experience in energy construction</FormLabel>
                      <FormControl>
                        <Input
                          inputMode="numeric"
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
                  name="currentAvailability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current availability</FormLabel>
                      <FormControl>
                        <select className={selectClass} {...field}>
                          {availabilityOptions.map((option) => (
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

                <div className="md:col-span-2">
                  <label className="block">
                    <span className="text-sm font-medium leading-none text-cv-charcoal">
                      Resume upload
                    </span>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="mt-2 block w-full rounded-md border border-cv-border bg-white px-3 py-2 text-sm text-cv-charcoal shadow-sm file:mr-3 file:rounded-md file:border-0 file:bg-cv-navy file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-cv-copper"
                    />
                    <span className="mt-1 block text-xs text-cv-steel">
                      Optional · PDF or Word · 5&nbsp;MB max
                    </span>
                  </label>
                </div>
              </div>

              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium leading-none text-cv-charcoal">
                  Roles you have held
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
                        {...form.register("rolesHeld")}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {errors.rolesHeld ? (
                  <p className="text-xs text-cv-danger">{errors.rolesHeld.message}</p>
                ) : null}
              </fieldset>

              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium leading-none text-cv-charcoal">
                  Project types worked
                </legend>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {projectTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-11 items-center gap-2 rounded-md border border-cv-border bg-cv-cream px-3 py-2 text-sm text-cv-charcoal transition-colors hover:border-cv-copper has-[:checked]:border-cv-copper has-[:checked]:bg-white"
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
                  <p className="text-xs text-cv-danger">
                    {errors.projectTypesWorked.message}
                  </p>
                ) : null}
              </fieldset>

              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium leading-none text-cv-charcoal">
                  Regions willing to work
                </legend>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {regionOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-11 items-center gap-2 rounded-md border border-cv-border bg-cv-cream px-3 py-2 text-sm text-cv-charcoal transition-colors hover:border-cv-copper has-[:checked]:border-cv-copper has-[:checked]:bg-white"
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
                {errors.regions ? (
                  <p className="text-xs text-cv-danger">{errors.regions.message}</p>
                ) : null}
              </fieldset>

              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications or licenses</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        className="rounded-md border-cv-border bg-white text-cv-charcoal shadow-sm focus-visible:border-cv-copper focus-visible:ring-cv-copper/30"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anything else</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
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
                  : "Join the network"}
              </Button>
            </form>
          </Form>
        </div>
        )}
      </SectionWrapper>
    </>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { JsonLdScript } from "~/components/json-ld-script";
import { SectionWrapper } from "~/components/section-wrapper";
import { StampedReceipt } from "~/components/stamped-receipt";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { contactSchema, type ContactValues } from "~/lib/forms";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import {
  saveFormSubmission,
  sendSubmissionNotification,
  toStringValue,
} from "~/lib/submissions.server";
import type { Route } from "./+types/contact";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Contact CrewVolt | Energy Infrastructure Staffing | Tennessee",
    description:
      "Get in touch with CrewVolt to staff your energy construction project or join our network of experienced inspectors, superintendents, and project managers.",
    path: "/contact",
  });
}

export function links() {
  return canonicalLinks("/contact");
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  const parsed = contactSchema.safeParse({
    name: toStringValue(formData.get("name")),
    email: toStringValue(formData.get("email")),
    phone: toStringValue(formData.get("phone")),
    message: toStringValue(formData.get("message")),
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
    await saveFormSubmission(env, "contact", parsed.data, parsed.data.email);
    await sendSubmissionNotification(env, {
      subject: "New contact submission",
      submitterName: parsed.data.name,
      submitterEmail: parsed.data.email,
      summaryLines: [`Phone: ${parsed.data.phone}`],
      payload: parsed.data,
    });
    return { ok: true, message: "Thank you. We will get back to you shortly." };
  } catch {
    return {
      ok: false,
      message: "We could not process your request. Please try again.",
    };
  }
}

export default function ContactRoute() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const navigation = useNavigation();

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CrewVolt",
    areaServed: "Tennessee",
    address: { "@type": "PostalAddress", addressRegion: "TN", addressCountry: "US" },
    description:
      "W-2 contract staffing for energy infrastructure projects including substations, wind, solar, BESS, and transmission.",
  };

  const { errors } = form.formState;

  if (actionData?.ok) {
    return (
      <SectionWrapper tone="vellum" eyebrow="RFI submission" badge="Sheet E-009">
        <StampedReceipt
          sheet="E-009"
          title="RFI received."
          message="We will get back to you shortly. If urgent, call +1 (423) 555-0100 or email staffing@crewvolt.com."
        />
      </SectionWrapper>
    );
  }

  return (
    <>
      <JsonLdScript data={localBusinessSchema} />

      <SectionWrapper tone="vellum" eyebrow="RFI submission" badge="Sheet E-009">
        <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr]">
          <aside className="cv-paper-flat self-start">
            <div className="border-b border-cv-pencil px-5 py-3">
              <p className="cv-slug-copper">Project information</p>
            </div>
            <dl className="divide-y divide-cv-rule-soft text-sm">
              <div className="px-5 py-3">
                <dt className="cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:staffing@crewvolt.com"
                    className="font-display text-[18px] font-medium tracking-tight text-cv-pencil hover:text-cv-copper"
                  >
                    staffing@crewvolt.com
                  </a>
                </dd>
              </div>
              <div className="px-5 py-3">
                <dt className="cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href="tel:+1-423-555-0100"
                    className="font-display text-[18px] font-medium tracking-tight text-cv-pencil hover:text-cv-copper"
                  >
                    +1 (423) 555-0100
                  </a>
                </dd>
              </div>
              <div className="px-5 py-3">
                <dt className="cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                  Region
                </dt>
                <dd className="mt-1 text-cv-pencil">East Tennessee · National field</dd>
              </div>
              <div className="px-5 py-3">
                <dt className="cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                  Quick links
                </dt>
                <dd className="mt-1 space-y-1.5">
                  <Link
                    to="/staff-my-project"
                    className="block cv-mono text-[11px] uppercase tracking-[0.18em] text-cv-copper hover:text-cv-copper-dark"
                  >
                    Sheet E-007 · Staff a project →
                  </Link>
                  <Link
                    to="/join-our-network"
                    className="block cv-mono text-[11px] uppercase tracking-[0.18em] text-cv-copper hover:text-cv-copper-dark"
                  >
                    Sheet E-008 · Join the network →
                  </Link>
                  <Link
                    to="/vendor-readiness"
                    className="block cv-mono text-[11px] uppercase tracking-[0.18em] text-cv-copper hover:text-cv-copper-dark"
                  >
                    Sheet E-010 · Vendor qualification →
                  </Link>
                </dd>
              </div>
            </dl>
          </aside>

          <div>
            <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
              Submit
              <em className="cv-display-italic"> RFI.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
              Use this for general questions, vendor qualification packets, and partnership
              inquiries. For project staffing, see{" "}
              <Link
                to="/staff-my-project"
                className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
              >
                Sheet E-007 →
              </Link>
            </p>

            <div className="mt-8 cv-paper-flat">
              <div className="border-b border-cv-pencil px-5 py-3">
                <p className="cv-slug-copper">RFI form</p>
              </div>
              <Form {...form}>
                <form className="space-y-5 p-5 md:p-7" onSubmit={onSubmit}>
                  <label className="block">
                    <span className="cv-form-label">A1 — Name</span>
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

                  <label className="block">
                    <span className="cv-form-label">A4 — Message</span>
                    <Textarea className="cv-input" rows={5} {...form.register("message")} />
                    {errors.message ? (
                      <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-revision-red">
                        {errors.message.message}
                      </p>
                    ) : null}
                  </label>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                    disabled={navigation.state === "submitting"}
                  >
                    {navigation.state === "submitting" ? "Stamping…" : "Submit RFI →"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

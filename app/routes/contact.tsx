import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { FormSuccess } from "~/components/form-success";
import { JsonLdScript } from "~/components/json-ld-script";
import { SectionWrapper } from "~/components/section-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
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

const fieldClassName =
  "h-11 rounded-md border-cv-border bg-white text-cv-charcoal shadow-sm focus-visible:border-cv-copper focus-visible:ring-cv-copper/30";

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

  // Honeypot — silent success, never persists.
  if (toStringValue(formData.get("website"))) {
    return { ok: true, message: "Thank you. We will get back to you shortly." };
  }

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
  } catch (err) {
    console.error("contact submission failed", err);
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CrewVolt",
    areaServed: "Tennessee",
    address: { "@type": "PostalAddress", addressRegion: "TN", addressCountry: "US" },
    description:
      "W-2 contract staffing for energy infrastructure projects including substations, wind, solar, BESS, and transmission.",
  };

  return (
    <>
      <JsonLdScript data={localBusinessSchema} />

      <SectionWrapper tone="parchment">
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Get in touch.
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <p className="font-logo text-lg font-bold tracking-[1.5px] text-cv-navy">
              CREWVOLT
            </p>
            <p className="mt-2 text-sm text-cv-charcoal">Tennessee LLC</p>
            <p className="mt-1 text-sm text-cv-charcoal">East Tennessee</p>
            <div className="mt-4 space-y-1.5">
              <a
                href="tel:+1-423-555-0100"
                className="block text-sm font-semibold text-cv-copper hover:text-cv-copper-dark"
              >
                +1 (423) 555-0100
              </a>
              <a
                href="mailto:staffing@crewvolt.com"
                className="block text-sm text-cv-copper hover:text-cv-copper-dark"
              >
                staffing@crewvolt.com
              </a>
            </div>
            <div className="mt-4 space-y-1 border-t border-cv-border pt-4">
              <p className="text-xs font-semibold tracking-[1px] uppercase text-cv-steel">
                Quick links
              </p>
              <Link
                to="/staff-my-project"
                className="block text-sm text-cv-copper hover:text-cv-copper-dark"
              >
                Staff my project
              </Link>
              <Link
                to="/join-our-network"
                className="block text-sm text-cv-copper hover:text-cv-copper-dark"
              >
                Join our network
              </Link>
              <Link
                to="/vendor-readiness"
                className="block text-sm text-cv-copper hover:text-cv-copper-dark"
              >
                Vendor readiness
              </Link>
            </div>
          </aside>

          {actionData?.ok ? (
            <FormSuccess message={actionData.message} />
          ) : (
          <div className="rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8">
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={onSubmit}
                aria-label="Contact form"
              >
                {/* Honeypot — bots fill this; humans don't see it. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="name"
                          className={fieldClassName}
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
                          className={fieldClassName}
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
                          className={fieldClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          className="rounded-md border-cv-border bg-white text-cv-charcoal shadow-sm focus-visible:border-cv-copper focus-visible:ring-cv-copper/30"
                          {...field}
                        />
                      </FormControl>
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
                  {navigation.state === "submitting" ? "Sending…" : "Send message"}
                </Button>
              </form>
            </Form>
          </div>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { JsonLdScript } from "~/components/json-ld-script";
import { SectionWrapper } from "~/components/section-wrapper";
import { contactSchema, type ContactValues } from "~/lib/forms";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import {
  saveFormSubmission,
  sendSubmissionNotification,
  toStringValue,
} from "~/lib/submissions.server";
import type { Route } from "./+types/contact";

const fieldClassName =
  "mt-1 w-full rounded-lg border border-cv-border bg-white px-3 py-2 text-sm text-cv-charcoal shadow-sm";

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

    return {
      ok: true,
      message: "Thank you. We will get back to you shortly.",
    };
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
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

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
        message: "",
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CrewVolt",
    areaServed: "Tennessee",
    address: {
      "@type": "PostalAddress",
      addressRegion: "TN",
      addressCountry: "US",
    },
    description:
      "W-2 contract staffing for energy infrastructure projects including substations, wind, solar, BESS, and transmission.",
  };

  const { errors } = form.formState;

  return (
    <>
      <JsonLdScript data={localBusinessSchema} />

      <SectionWrapper tone="parchment">
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">Get in touch.</h1>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <p className="font-logo text-lg font-bold tracking-[1.5px] text-cv-navy">CREWVOLT</p>
            <p className="mt-2 text-sm text-cv-charcoal">Tennessee LLC</p>
            <p className="mt-1 text-sm text-cv-charcoal">Location: East Tennessee</p>
            <p className="mt-1 text-sm text-cv-charcoal">Phone: To be added</p>
            <p className="mt-1 text-sm text-cv-charcoal">Email: staffing@crewvolt.com</p>
          </aside>

          <div className="rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8">
            <Form {...form}>
              <form className="space-y-5" onSubmit={onSubmit}>
                <label className="block">
                  <span className="cv-form-label">Name</span>
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
                  <span className="cv-form-label">Message</span>
                  <Textarea className={fieldClassName} rows={5} {...form.register("message")} />
                  {errors.message ? (
                    <p className="mt-1 text-xs text-cv-danger">{errors.message.message}</p>
                  ) : null}
                </label>

                <Button type="submit" variant="accent" disabled={navigation.state === "submitting"}>
                  {navigation.state === "submitting" ? "Sending..." : "Send message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

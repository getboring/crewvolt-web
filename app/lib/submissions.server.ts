export type CrewVoltFormType = "staff_project" | "join_network" | "contact";

type CrewVoltEnv = Env & {
  DB: D1Database;
  UPLOADS?: R2Bucket;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
};

export function toStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function toStringArray(values: FormDataEntryValue[]) {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => value.length > 0);
}

export function sanitizeFilename(filename: string) {
  const extIndex = filename.lastIndexOf(".");
  const extension = extIndex >= 0 ? filename.slice(extIndex).toLowerCase() : "";
  const base = extIndex >= 0 ? filename.slice(0, extIndex) : filename;
  const safeBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `${safeBase || "resume"}${extension}`;
}

export async function saveFormSubmission(
  env: CrewVoltEnv,
  formType: CrewVoltFormType,
  payload: Record<string, unknown>,
  email?: string
) {
  if (!env.DB) {
    throw new Error("Missing D1 binding: DB");
  }

  await env.DB.prepare(
    `INSERT INTO form_submissions (id, form_type, data, email, status)
     VALUES (?1, ?2, ?3, ?4, ?5)`
  )
    .bind(crypto.randomUUID(), formType, JSON.stringify(payload), email ?? null, "new")
    .run();
}

export async function uploadResumeIfPresent(env: CrewVoltEnv, resumeFile: File | null) {
  if (!resumeFile || resumeFile.size === 0) {
    return null;
  }

  if (!env.UPLOADS) {
    return null;
  }

  const key = `resumes/${crypto.randomUUID()}-${sanitizeFilename(resumeFile.name)}`;
  await env.UPLOADS.put(key, resumeFile.stream(), {
    httpMetadata: {
      contentType: resumeFile.type || "application/octet-stream",
    },
  });

  return key;
}

export async function sendSubmissionNotification(
  env: CrewVoltEnv,
  params: {
    subject: string;
    submitterName: string;
    submitterEmail: string;
    summaryLines: string[];
    payload: Record<string, unknown>;
  }
) {
  if (!env.RESEND_API_KEY || !env.NOTIFICATION_EMAIL) {
    return;
  }

  const bodyHtml = [
    `<p><strong>${params.submitterName}</strong> submitted a CrewVolt form.</p>`,
    `<p><strong>Email:</strong> ${params.submitterEmail}</p>`,
    "<ul>",
    ...params.summaryLines.map((line) => `<li>${line}</li>`),
    "</ul>",
    `<p><strong>Payload:</strong></p><pre>${JSON.stringify(params.payload, null, 2)}</pre>`,
  ].join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || "CrewVolt <no-reply@crewvolt.com>",
      to: [env.NOTIFICATION_EMAIL],
      subject: params.subject,
      html: bodyHtml,
    }),
  });
}

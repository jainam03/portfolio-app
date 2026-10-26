export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactValidation =
  | { success: true; data: ContactData }
  | { success: false; error: string };

export function validateContactPayload(input: unknown): ContactValidation {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { success: false, error: "Please submit a valid contact form." };
  }

  const fields = input as Record<string, unknown>;
  const values = ["name", "email", "subject", "message", "website"] as const;
  if (values.some((field) => fields[field] !== undefined && typeof fields[field] !== "string")) {
    return { success: false, error: "Please use text in each contact form field." };
  }

  const data: ContactData = {
    name: String(fields.name ?? "").trim(),
    email: String(fields.email ?? "").trim(),
    subject: String(fields.subject ?? "").trim(),
    message: String(fields.message ?? "").trim(),
    website: String(fields.website ?? "").trim(),
  };

  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Name, email, and message are required." };
  }
  if (data.name.length > 100 || data.email.length > 254 || data.subject.length > 150 || data.message.length > 5000) {
    return { success: false, error: "One or more fields are too long." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.email)) {
    return { success: false, error: "Please provide a valid email address." };
  }
  if (/[\r\n]/.test(data.subject)) {
    return { success: false, error: "Please use a single-line subject." };
  }

  return { success: true, data };
}

export function escapeEmailHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

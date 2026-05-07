import { z } from "zod";

export const projectTypeValues = [
  "substation",
  "wind",
  "solar",
  "bess",
  "transmission",
  "grid_modernization",
  "other",
] as const;

export const sideValues = ["owner_utility", "contractor_epc"] as const;

export const availabilityValues = [
  "available_now",
  "one_to_four_weeks",
  "one_to_three_months",
  "exploring",
] as const;

export const regionValues = [
  "southeast",
  "texas",
  "midwest",
  "northeast",
  "west_coast",
  "anywhere",
] as const;

export const roleValues = [
  "project_manager",
  "construction_manager",
  "electrical_inspector",
  "civil_inspector",
  "high_voltage_inspector",
  "structural_inspector",
  "mechanical_inspector",
  "electrical_superintendent",
  "civil_superintendent",
  "qaqc_manager",
  "qaqc_inspector",
  "safety_manager",
  "environmental_compliance",
  "site_administrator",
  "other",
] as const;

export const projectTypeOptions = [
  { value: "substation", label: "Substation" },
  { value: "wind", label: "Wind" },
  { value: "solar", label: "Solar" },
  { value: "bess", label: "BESS" },
  { value: "transmission", label: "Transmission" },
  { value: "grid_modernization", label: "Grid modernization" },
  { value: "other", label: "Other" },
] as const;

export const sideOptions = [
  { value: "owner_utility", label: "Owner / utility" },
  { value: "contractor_epc", label: "Contractor / EPC" },
] as const;

export const availabilityOptions = [
  { value: "available_now", label: "Available now" },
  { value: "one_to_four_weeks", label: "Available in 1-4 weeks" },
  { value: "one_to_three_months", label: "Available in 1-3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const regionOptions = [
  { value: "southeast", label: "Southeast" },
  { value: "texas", label: "Texas" },
  { value: "midwest", label: "Midwest" },
  { value: "northeast", label: "Northeast" },
  { value: "west_coast", label: "West Coast" },
  { value: "anywhere", label: "Willing to travel anywhere" },
] as const;

export const roleOptions = [
  { value: "project_manager", label: "Project manager" },
  { value: "construction_manager", label: "Construction manager" },
  { value: "electrical_inspector", label: "Electrical inspector" },
  { value: "civil_inspector", label: "Civil inspector" },
  { value: "high_voltage_inspector", label: "High voltage inspector" },
  { value: "structural_inspector", label: "Structural inspector" },
  { value: "mechanical_inspector", label: "Mechanical inspector" },
  { value: "electrical_superintendent", label: "Electrical superintendent" },
  { value: "civil_superintendent", label: "Civil superintendent" },
  { value: "qaqc_manager", label: "QA/QC manager" },
  { value: "qaqc_inspector", label: "QA/QC inspector" },
  { value: "safety_manager", label: "Safety manager" },
  { value: "environmental_compliance", label: "Environmental compliance" },
  { value: "site_administrator", label: "Site administrator" },
  { value: "other", label: "Other" },
] as const;

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`).max(1000, `${label} is too long`);

const optionalText = z.string().trim().max(5000).optional().or(z.literal(""));

// Step 1 — minimum-viable intake (4 fields). Optional fields can fill in step 2 / disclosure.
export const staffProjectSchema = z.object({
  yourName: requiredText("Your name"),
  companyName: requiredText("Company name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: requiredText("Phone"),
  projectType: z.enum(projectTypeValues).optional(),
  projectSide: z.enum(sideValues).optional(),
  projectName: optionalText,
  projectLocation: optionalText,
  rolesNeeded: z.array(z.enum(roleValues)).optional(),
  anticipatedStartDate: optionalText,
  estimatedDuration: optionalText,
  additionalDetails: optionalText,
});

export const joinNetworkSchema = z.object({
  name: requiredText("Name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: requiredText("Phone"),
  cityState: optionalText,
  rolesHeld: z.array(z.enum(roleValues)).optional(),
  projectTypesWorked: z.array(z.enum(projectTypeValues)).optional(),
  yearsExperience: z
    .string()
    .trim()
    .regex(/^\d*$/, "Years of experience must be a whole number")
    .optional()
    .or(z.literal("")),
  regions: z.array(z.enum(regionValues)).optional(),
  currentAvailability: z.enum(availabilityValues).optional(),
  certifications: optionalText,
  notes: optionalText,
});

export const contactSchema = z.object({
  name: requiredText("Name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: requiredText("Phone"),
  message: requiredText("Message"),
});

export type StaffProjectValues = z.infer<typeof staffProjectSchema>;
export type JoinNetworkValues = z.infer<typeof joinNetworkSchema>;
export type ContactValues = z.infer<typeof contactSchema>;

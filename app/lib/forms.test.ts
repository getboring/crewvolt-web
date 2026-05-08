import { describe, expect, it } from "vitest";

import {
  contactSchema,
  joinNetworkSchema,
  staffProjectSchema,
} from "~/lib/forms";

describe("contactSchema", () => {
  it("accepts a valid contact submission", () => {
    const result = contactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+1-423-555-0100",
      message: "We need staffing on a substation project.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "not-an-email",
      phone: "",
      message: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const flat = result.error.flatten();
      expect(flat.fieldErrors.name).toBeDefined();
      expect(flat.fieldErrors.email).toBeDefined();
      expect(flat.fieldErrors.phone).toBeDefined();
      expect(flat.fieldErrors.message).toBeDefined();
    }
  });

  it("rejects an invalid email format", () => {
    const result = contactSchema.safeParse({
      name: "Jane",
      email: "not-an-email",
      phone: "+1-423-555-0100",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });
});

describe("staffProjectSchema", () => {
  const valid = {
    yourName: "Pat Smith",
    companyName: "Acme Utility",
    email: "pat@acme.com",
    phone: "+1-423-555-0100",
    projectName: "",
    projectLocation: "Bristol, TN",
    projectType: "substation",
    projectSide: "owner_utility",
    rolesNeeded: ["electrical_inspector"],
    anticipatedStartDate: "2026-06-15",
    estimatedDuration: "12 months",
    additionalDetails: "",
  };

  it("accepts a valid intake", () => {
    const result = staffProjectSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("treats additionalDetails as optional", () => {
    const result = staffProjectSchema.safeParse({
      ...valid,
      additionalDetails: "",
    });
    expect(result.success).toBe(true);
  });

  it("requires at least one role", () => {
    const result = staffProjectSchema.safeParse({
      ...valid,
      rolesNeeded: [],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const flat = result.error.flatten();
      expect(flat.fieldErrors.rolesNeeded).toBeDefined();
    }
  });

  it("rejects an invalid projectType enum", () => {
    const result = staffProjectSchema.safeParse({
      ...valid,
      projectType: "nuclear",
    });
    expect(result.success).toBe(false);
  });
});

describe("joinNetworkSchema", () => {
  const valid = {
    name: "Lee Tucker",
    email: "lee@example.com",
    phone: "+1-423-555-0100",
    cityState: "Knoxville, TN",
    rolesHeld: ["electrical_inspector"],
    projectTypesWorked: ["substation"],
    yearsExperience: "15",
    regions: ["southeast"],
    currentAvailability: "available_now",
    certifications: "",
    notes: "",
  };

  it("accepts a valid worker intake", () => {
    const result = joinNetworkSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects non-numeric years of experience", () => {
    const result = joinNetworkSchema.safeParse({
      ...valid,
      yearsExperience: "fifteen",
    });
    expect(result.success).toBe(false);
  });

  it("requires at least one role + project type + region", () => {
    const result = joinNetworkSchema.safeParse({
      ...valid,
      rolesHeld: [],
      projectTypesWorked: [],
      regions: [],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const flat = result.error.flatten();
      expect(flat.fieldErrors.rolesHeld).toBeDefined();
      expect(flat.fieldErrors.projectTypesWorked).toBeDefined();
      expect(flat.fieldErrors.regions).toBeDefined();
    }
  });
});

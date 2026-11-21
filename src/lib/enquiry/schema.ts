import { z } from "zod";

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

export const STATUS_OPTIONS = [
  { value: "student", label: "Student" },
  { value: "working", label: "Working" },
  { value: "other", label: "Other" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .refine((v) => /^\+?[0-9\s\-()]+$/.test(v), "Use digits only (you may include + and spaces)")
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 15;
    }, "Enter a valid phone number (10 to 15 digits)"),
  gender: z.enum(values(GENDER_OPTIONS), { error: "Please select an option" }),
  status: z.enum(values(STATUS_OPTIONS), { error: "Please select your status" }),
  preferredJoiningDate: z.string(),
  message: z.string().trim().max(1000, "Please keep your message under 1000 characters"),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

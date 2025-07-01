
import { z } from "zod";

export const formSchema = z.object({
  firstname: z.string().min(2, "Full name must be at least 2 characters"),
  lastname: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  email: z.string().email("Please enter a valid email address"),
  enrollmentNumber: z
    .string()
    .min(3, "Enrollment number must be at least 3 characters"),
  registrationNumber: z
    .string()
    .min(3, "Registration number must be at least 3 characters"),
  branch: z.enum(["CE", "CSE", "EC", "CIVIL", "MECH", "EE"], {
    errorMap: () => ({ message: "Please select a valid branch" }),
  }),
});

export type FormData = z.infer<typeof formSchema>;

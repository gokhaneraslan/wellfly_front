import { z } from "zod";

export const UserFormValidation = z.object({

  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .refine((password) => /^((?=.*?[A-Z])|(?=.*?[a-z]))(?=.*?[0-9])/.test(password), "Password must consist of letters and numbers."),
});

export const RegisterFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
  .string()
  .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  password: z
    .string()
    .refine((password) => /^((?=.*?[A-Z])|(?=.*?[a-z]))(?=.*?[0-9])/.test(password), "Password must consist of letters and numbers."),
});

export const ClinicFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  website: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters"),
  startTime: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters"),
  endTime: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters"),
  services: z
  .string(),
  categories: z
  .string(),
  info: z
  .string()
  .min(2, "Name must be at least 2 characters"),
  serviceInfo: z
  .string()
  .min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .refine((password) => /^((?=.*?[A-Z])|(?=.*?[a-z]))(?=.*?[0-9])/.test(password), "Password must consist of letters and numbers."),

});
export const ClinicRegisterFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  website: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters"),
  startTime: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters"),
  endTime: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters"),
  info: z
  .string()
  .min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .refine((password) => /^((?=.*?[A-Z])|(?=.*?[a-z]))(?=.*?[0-9])/.test(password), "Password must consist of letters and numbers."),

});
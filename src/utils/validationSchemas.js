import * as z from "zod";

export const vehicleSchema = z.object({
  manufacture: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  bodyType: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
  year: z
    .number()
    .int()
    .gte(1886)
    .lte(new Date().getFullYear() + 1),
  engineCapacity: z.number().positive(),
  odometerReading: z.number().nonnegative(),
  seatingCapacity: z.number().min(1),
  vehicleType: z.enum([
    "ELECTRIC",
    "SUV",
    "TRUCK",
    "MOTORCYCLE",
    "BUS",
    "VAN",
    "PICKUP",
    "OTHER",
  ]),
  fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "GAS", "OTHER"]),
  purpose: z.enum(["PERSONAL", "COMMERCIAL", "TAXI", "GOVERNMENT"]),
  status: z.enum(["NEW", "USED", "REBUILT"]),
});

export const ownerSchema = z.object({
  ownerName: z.string().min(1),
  ownerType: z.enum(["INDIVIDUAL", "COMPANY", "NGO", "GOVERNMENT"]),
  address: z.string().min(1),
  nationalID: z.string().regex(/^\d{16}$/),
  mobileNumber: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  companyRegNumber: z.string().optional(),
  passportNumber: z.string().optional(),
}).refine((data) => {
  if (data.ownerType === "COMPANY") {
    return data.companyRegNumber && data.companyRegNumber.length > 0;
  }
  return true;
}, {
  message: "Company Registration Number is required for COMPANY owner type",
  path: ["companyRegNumber"],
});

export const registrationSchema = z.object({
  plateNumber: z
    .string()
    .regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i),
  plateType: z.enum(["PRIVATE", "COMMERCIAL", "GOVERNMENT", "DIPLOMATIC", "PERSONALIZED"]),
  registrationDate: z.string(),
  expiryDate: z.string(),
  insuranceExpiryDate: z.string(),
  policyNumber: z.string().min(1),
  companyName: z.string().min(1),
  insuranceType: z.string().min(1),
  roadworthyCert: z.string().min(1),
  customsRef: z.string().min(1),
  proofOfOwnership: z.string().min(1),
  state: z.enum(["ACTIVE", "SUSPENDED", "EXPIRED", "PENDING"]),
  insuranceState: z.enum(["ACTIVE", "SUSPENDED", "EXPIRED"]), // No PENDING for insurance
}).refine((data) => {
  const now = new Date();
  const expiry = new Date(data.expiryDate);
  const insuranceExpiry = new Date(data.insuranceExpiryDate);
  return expiry > now && insuranceExpiry > now;
}, {
  message: "Expiry dates cannot be in the past",
  path: ["expiryDate"],
});
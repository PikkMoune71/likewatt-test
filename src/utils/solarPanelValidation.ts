import { z } from "zod";

export const solarPanelSchema = z.object({
  model: z.string().min(1, "Le modèle est requis."),
  tilt: z
    .number()
    .min(0, "L'inclinaison ne peut pas être négative.")
    .max(180, "L'inclinaison ne peut pas dépasser 180 degrés."),
  capacity: z
    .number()
    .min(0.1, "La capacité doit être supérieure à 0.")
    .max(1000, "La capacité semble trop élevée."),
  isActive: z.boolean(),
});

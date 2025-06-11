import { z } from "zod";

export const emailSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    confirmEmail: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha obrigatória"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não coincidem",
    path: ["confirmEmail"],
  });

export type EmailSchemaType = z.infer<typeof emailSchema>;

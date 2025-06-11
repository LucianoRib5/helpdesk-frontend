import z from "zod";

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Senha atual obrigatória"),
    newPassword: z.string().min(6, "Nova senha obrigatória"),
    confirmPassword: z.string().min(6, "Confirme a nova senha"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type PasswordSchemaType = z.infer<typeof passwordSchema>;

import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  cnpj: z.string().optional(),
  phoneNumber: z.string().min(8, 'Telefone inválido'),
  cep: z.string().min(8, 'CEP inválido'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type UserSchema = z.infer<typeof userSchema>;

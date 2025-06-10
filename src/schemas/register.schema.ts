import { z } from 'zod';
import { UserTypeId } from '../features/user/userTypes';

export const userSchemaAdmin = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  cnpj: z.string().optional(),
  phoneNumber: z.string().min(8, 'Telefone inválido'),
  type: z.nativeEnum(UserTypeId, {
    required_error: 'O tipo é obrigatório.',
  }),
  cep: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})
.refine((data) => {
  if (data.type === UserTypeId.CUSTOMER) {
    return !!data.cep && !!data.address;
  }
  return true;
}, {
  message: 'CEP e Endereço são obrigatórios para clientes.',
  path: ['cep'],
});

export type UserSchemaAdmin = z.infer<typeof userSchemaAdmin>;

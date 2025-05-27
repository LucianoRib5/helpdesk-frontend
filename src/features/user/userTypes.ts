export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string | null;
    phoneNumber: string;
}

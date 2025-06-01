import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userSchema, type UserSchema } from '../../schemas/user.schema';
import type { CreateUserPayload } from '../../features/user/userTypes';
import { 
  CheckboxField, 
  CustomButton, 
  CustomInput, 
  CustomPaper, 
  CustomText 
} from '../../components';
import UserService  from '../../services/UserService';

const UserRegister: React.FC = () => {
  const [isCompany, setIsCompany] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: CreateUserPayload) => UserService.createUser(payload),
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error: any) => {
      console.error('Erro ao criar usuário:', error);
    },
  });

  const onSubmit = (data: UserSchema) => {
    const payload: CreateUserPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber,
      cnpj: isCompany ? data.cnpj ?? null : undefined,
    };

    mutate(payload);
  };

  return (
    <CustomPaper>
      <CustomText>Criar Conta</CustomText>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomInput
          label="Nome"
          register={register('name')}
          fieldError={errors.name}
        />
        <CustomInput
          label="E-mail"
          register={register('email')}
          fieldError={errors.email}          
        />
        <CheckboxField
          label="Pessoa Jurídica"
          checked={isCompany}
          onChange={setIsCompany}
        />
        <CustomInput
          label="CPF"
          register={register('cpf')}
          fieldError={errors.cpf}
        />
        {isCompany && (
          <CustomInput
            label="CNPJ"
            register={register('cnpj')}
            fieldError={errors.cnpj}
          />
        )}
        <CustomInput
          label="Telefone"
          register={register('phoneNumber')}
          fieldError={errors.phoneNumber}
        />
        <CustomInput
          label="Senha"
          type="password"
          register={register('password')}
          fieldError={errors.password}
        />
        <CustomInput
          label="Confirmar Senha"
          type="password"
          register={register('confirmPassword')}
          fieldError={errors.confirmPassword}
        />
        <CustomButton>
          Cadastrar
        </CustomButton>
      </form>
        <p>
          Já tem uma conta?{' '}
          <a href="/login">
            Login
          </a>
      </p>
    </CustomPaper>
  );
};

export default UserRegister;

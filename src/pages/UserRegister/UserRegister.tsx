import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userSchema, type UserSchema } from '../../schemas/user.schema';
import UserService  from '../../services/UserService';
import type { CreateUserPayload } from '../../features/user/userTypes';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import CustomPaper from '../../components/CustomPaper';
import CheckboxField from '../../components/CheckboxField';

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
          name='name'
          label="Nome"
          register={register('name')}
          fieldError={errors.name}
        />
        <CustomInput
          name='email'
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
          name='cpf'
          label="CPF"
          register={register('cpf')}
          fieldError={errors.cpf}
        />
        {isCompany && (
          <CustomInput
            name='cnpj'
            label="CNPJ"
            register={register('cnpj')}
            fieldError={errors.cnpj}
          />
        )}
        <CustomInput
          name='phoneNumber'
          label="Telefone"
          register={register('phoneNumber')}
          fieldError={errors.phoneNumber}
        />
        <CustomInput
          name='password'
          label="Senha"
          type="password"
          register={register('password')}
          fieldError={errors.password}
        />
        <CustomInput
          name='confirmPassword'
          label="Confirmar Senha"
          type="password"
          register={register('confirmPassword')}
          fieldError={errors.confirmPassword}
        />
        <CustomButton>
          Cadastrar
        </CustomButton>
      </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <a href="/login" className="text-black font-medium hover:underline">
            Login
          </a>
      </p>
    </CustomPaper>
  );
};

export default UserRegister;

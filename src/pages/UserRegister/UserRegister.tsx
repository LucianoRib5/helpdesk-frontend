import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userSchema, type UserSchema } from '../../schemas/user.schema';
import UserService  from '../../services/UserService';
import type { CreateUserPayload } from '../../features/user/userTypes';
import Input from '../../components/Input';
import Text from '../../components/Text';
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
      <Text>Criar Conta</Text>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input 
          name='name'
          label="Nome"
          register={register('name')}
          fieldError={errors.name}
        />
        <Input
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
        <Input
          name='cpf'
          label="CPF"
          register={register('cpf')}
          fieldError={errors.cpf}
        />
        {isCompany && (
          <Input
            name='cnpj'
            label="CNPJ"
            register={register('cnpj')}
            fieldError={errors.cnpj}
          />
        )}
        <Input
          name='phoneNumber'
          label="Telefone"
          register={register('phoneNumber')}
          fieldError={errors.phoneNumber}
        />
        <Input
          name='password'
          label="Senha"
          type="password"
          register={register('password')}
          fieldError={errors.password}
        />
        <Input
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
    </CustomPaper>
  );
};

export default UserRegister;

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserSchema } from '../../schemas/user.schema';
import type { CreateUserPayload } from '../../features/user/userTypes';
import {
  CustomButton, 
  CustomInput, 
  CustomPaper, 
  CustomText 
} from '../../components';
import type { City } from '../../types/city';
import { toast } from 'react-toastify';
import { formatCep } from '../../utils/formatCep';
import { formatCnpj } from '../../utils/formatCnpj';
import { formatCpf } from '../../utils/formatCpf';
import UserService  from '../../services/UserService';
import CityService from '../../services/CityService';
import type { AxiosError } from 'axios';
import * as S from './styles';

const UserRegister: React.FC = () => {
  const [city, setCity] = useState<City | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: CreateUserPayload) => UserService.createUser(payload),
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: 'colored',
        }
      )
    },
  });

  const watchCep = watch('cep');

  const { data, isLoading } = useQuery({
    queryKey: ['city', watchCep],
    queryFn: async () => {
      try {
        const response = await CityService.getCityByCep(watchCep ?? '');
        return response.data;
      } catch (error: any) {
        toast.error(
          (error.response?.data as { message?: string })?.message,
          {
            autoClose: 3000,
            theme: 'colored',
          }
        )
        setValue('cep', '');
      }
    },
    enabled: !!watchCep && watchCep.length === 9,
  });

  useEffect(() => {
    if (data && !isLoading) setCity(data);
  }, [data]);

  const onSubmit = (data: UserSchema) => {
    if (!city) return;
    const payload: CreateUserPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber,
      cnpj: data.cnpj || undefined,
      address: data.address,
      cityId: city.id,
    };

    mutate(payload);
  };

  return (
    <CustomPaper>
      <CustomText variant='h6' fontWeight='bold'>Criar Conta</CustomText>
      <S.CustomForm onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <CustomInput
          label="CPF"
          {...register('cpf', {
            onChange: (e) => {
              e.target.value = formatCpf(e.target.value);
            },
          })}
          fieldError={errors.cpf}
        />
        <CustomInput
          sx={{ width: '100%' }}
          label="CNPJ"
          {...register('cnpj', {
            onChange: (e) => {
              e.target.value = formatCnpj(e.target.value);
            },
          })}
          fieldError={errors.cnpj}
        />
        <CustomInput
          label="Telefone"
          register={register('phoneNumber')}
          fieldError={errors.phoneNumber}
        />
        <CustomInput
          label="CEP"
          fieldError={errors.cep}
          {...register('cep', {
            onChange: (e) => {
              e.target.value = formatCep(e.target.value);
            },
          })}
        />
        <CustomInput
          label="Endereço"
          register={register('address')}
          fieldError={errors.address}
          placeholder="Rua, Número, Bairro, etc."
          disabled={!city}
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
        <CustomButton
          sx={{ width: '100%' }}
        >
          Cadastrar
        </CustomButton>
      </S.CustomForm>
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

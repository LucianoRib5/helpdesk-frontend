import { Button } from '@mui/material';
import { CustomInput, CustomPaper, CustomText } from '../../components';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { UserTypeId, type UpdateBasicDataPayload } from '../../features/user/userTypes';
import { formatCep } from '../../utils/formatCep';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUser } from '../../store/slices/authSlice';
import type { City } from '../../types/city';
import type { AxiosError } from 'axios';
import UserService from '../../services/UserService';
import CityService from '../../services/CityService';
import * as S from './styles';

type FormData = {
  name?: string;
  phoneNumber?: string | null;
  cep: string | null;
  address: string | null;
};

const AccountSettings: React.FC = () => {
  const [city, setCity] = useState<City | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user) {
      setValue('name', user.userName);
      setValue('phoneNumber', user.phoneNumber);
      setValue('cep', user.cep || null);
      setValue('address', user.address || null);
    }
  }, [user]);

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
    enabled: !!watchCep && watchCep.length === 9 && user?.userTypeId === UserTypeId.CUSTOMER,
  });

  useEffect(() => {
    if (data && !isLoading) setCity(data);
  }, [data]);

  const onSubmit = (data: FormData) => {
    const payload: UpdateBasicDataPayload = {
      userId: user?.userId || 0,
      name: data.name || '',
      phoneNumber: data.phoneNumber || null,
      address: data.address || null,
      cityId: city?.id || null,
    }
    UserService.updateBasicData(payload).then((response) => {
      dispatch(setUser(response.data));
      toast.success('Dados atualizados com sucesso!', {
        autoClose: 3000,
        theme: 'colored',
      });
    }).catch((error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message || 'Erro ao atualizar dados',
        {
          autoClose: 3000,
          theme: 'colored',
        }
      );
    });
  }

  return (
    <CustomPaper
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 2,
        p: 3,
      }}
    >
      <S.Header>
        <CustomText variant='h5' fontWeight='bold' gutterBottom>
          Editar dados da conta
        </CustomText>
        <S.ContainerButtons>
          <Button
            type='submit'
            variant='outlined'
            sx={{
              height: 40,
              px: 4,
              color: 'black',
              fontWeight: 600,
            }}
            onClick={() => alert('Abrir chamado')}
          >
            ALTERAR E-MAIL
          </Button>
          <Button
            type='submit'
            variant='outlined'
            sx={{
              height: 40,
              px: 4,
              color: 'black',
              fontWeight: 600,
            }}
            onClick={() => alert('Abrir chamado')}
          >
            ALTERAR SENHA
          </Button>
        </S.ContainerButtons>
      </S.Header>
      <CustomInput
        label='Nome'
        register={register('name')}
        fieldError={errors.name}
      />
      <CustomInput
        label='Telefone'
        register={register('phoneNumber')}
        fieldError={errors.phoneNumber}
      />
      {
        user?.userTypeId === 1 && (
          <>
            <CustomInput
              label='CEP'
              fieldError={errors.cep}
              {...register('cep', {
                onChange: (e) => {
                  e.target.value = formatCep(e.target.value);
                },
              })}
            />
            <CustomInput
              label='Endereço'
              register={register('address')}
              fieldError={errors.address}
              placeholder='Rua, Número, Bairro, etc.'
              disabled={!city}
            />
          </>
        )
      }
      <Button
        variant='contained'
        type='submit'
        sx={{ borderRadius: '12px', px: 4, width: 'fit-content', mt: 2 }}
      >
        Salvar Alterações
      </Button>
    </CustomPaper>
  );
}

export default AccountSettings;

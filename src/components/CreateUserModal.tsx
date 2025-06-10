import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { UserTypeId, type CreateUserPayload, type UserBasicInfo } from "../features/user/userTypes";
import { formatCpf } from "../utils/formatCpf";
import { formatCnpj } from "../utils/formatCnpj";
import { userSchemaAdmin, type UserSchemaAdmin } from "../schemas/register.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { City } from "../types/city";
import { formatCep } from "../utils/formatCep";
import CheckboxField from "./CheckboxField";
import CustomBox from "./CustomBox";
import CustomInput from "./CustomInput";
import CityService from "../services/CityService";
import UserService from "../services/UserService";
import type { AxiosError } from "axios";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updateUser } from '../store/slices/authSlice';

interface CreateUserModalProps {
  open: boolean;
  userToEdit: UserBasicInfo | null;
  onClose: () => void;
  setUserToEdit: React.Dispatch<React.SetStateAction<UserBasicInfo | null>>
}

export default function CreateUserModal({
  open,
  userToEdit,
  onClose,
  setUserToEdit
}: CreateUserModalProps) {
	const [isCompany, setIsCompany] = useState(false);
  const [city, setCity] = useState<City | null>(null);
  const dispatch = useAppDispatch();
	
  const {
    control,
    handleSubmit,
    watch,
	  register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserSchemaAdmin>({
    resolver: zodResolver(userSchemaAdmin),
  });

  useEffect(() => {
    if(userToEdit) {
      console.log('userToEdit.userTypeId', userToEdit.userTypeId);
      setIsCompany(userToEdit.cnpj !== null);
      setValue('name', userToEdit.userName);
      setValue('email', userToEdit.email);
      setValue('phoneNumber', userToEdit.phoneNumber ?? '');
      setValue('cpf', userToEdit.cpf ?? '');
      setValue('cnpj', userToEdit.cnpj ?? '');
      setValue('type', userToEdit.userTypeId);
      setValue('cep', userToEdit.cep ?? '');
      setValue('address', userToEdit.address ?? '');
    }
  }, [userToEdit]);

  const selectedType = watch("type");
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
    enabled: !!watchCep && watchCep.length === 9 && selectedType === UserTypeId.CUSTOMER,
  });

  useEffect(() => {
    if (data && !isLoading) setCity(data);
  }, [data]);

  const closeModal = () => {
    onClose();
    reset();
    setIsCompany(false);
    setCity(null);
    setUserToEdit(null);
  }

  const { mutate } = useMutation({
    mutationFn: (payload: CreateUserPayload) => UserService.createUser(payload),
    onSuccess: () => closeModal(),
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

  const onSubmitupdateUser = useMutation({
    mutationFn: (payload: CreateUserPayload) => UserService.updateUser(userToEdit?.userId!, payload),
    onSuccess: (response) => { 
      closeModal()
      dispatch(updateUser(response.data));
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

  const onSubmit = (data: UserSchemaAdmin) => {
    if (data.type === UserTypeId.CUSTOMER && !city) return;

    const payload: CreateUserPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber,
      cnpj: isCompany ? data.cnpj ?? null : undefined,
      typeId: data.type,
    };

    if (data.type === UserTypeId.CUSTOMER) {
      payload.address = data.address;
      payload.cityId = city?.id;
    }

    if (userToEdit) {
      return onSubmitupdateUser.mutate(payload);
    }

    mutate(payload);
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        {userToEdit ? 'Editar Usuário' : 'Criar Usuário'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
					<CustomBox sx={{ display: 'flex', gap: 2 }}>
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
							label="Telefone"
							register={register('phoneNumber')}
							fieldError={errors.phoneNumber}
						/>
					</CustomBox>
					<CheckboxField
						label="Pessoa Jurídica"
						checked={isCompany}
						onChange={setIsCompany}
					/>
					<CustomBox sx={{ display: 'flex', gap: 2 }}>
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
							label="CNPJ"
							disabled={!isCompany}
							{...register('cnpj', {
								onChange: (e) => {
									e.target.value = formatCnpj(e.target.value);
								},
							})}
							fieldError={errors.cnpj}
						/>
					</CustomBox>
          { !userToEdit && (
            <CustomBox sx={{ display: 'flex', gap: 2 }}>
              <CustomInput
                label="Senha"
                type="password"
                register={register('password', {
                  required: !userToEdit ? 'Senha é obrigatória' : false,
                  minLength: !userToEdit
                    ? { value: 6, message: 'A senha deve ter no mínimo 6 caracteres' }
                    : undefined,
                })}
                fieldError={errors.password}
              />
              <CustomInput
                label="Confirmar Senha"
                type="password"
                {...register('confirmPassword', {
                  required: userToEdit ? false : 'Confirmação de senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter no mínimo 6 caracteres',
                  },
                })}
                fieldError={errors.confirmPassword}
              />
            </CustomBox>
          )}
					<CustomBox>
						<Typography variant="subtitle1" fontWeight={500} mb={1}>
							Tipo
						</Typography>
						<Controller
							name="type"
							control={control}
							render={({ field: { onChange, value, ...rest } }) => (
								<RadioGroup 
									row 
									{...rest} 
									value={value}
									onChange={(e) => onChange(Number(e.target.value))}
								>
									<FormControlLabel
										value={UserTypeId.CUSTOMER}
										control={<Radio />}
										label="Cliente"
									/>
									<FormControlLabel
										value={UserTypeId.SUPPORT_OPERATOR}
										control={<Radio />}
										label="Operador de Suporte"
									/>
									<FormControlLabel
										value={UserTypeId.TECHNICIAN}
										control={<Radio />}
										label="Técnico"
									/>
									<FormControlLabel
										value={UserTypeId.ADMINISTRATOR}
										control={<Radio />}
										label="Administrador"
									/>
								</RadioGroup>
							)}
						/>
						{errors.type && (
							<Typography color="error" variant="caption">
								{errors.type.message}
							</Typography>
						)}
					</CustomBox>
					{Number(selectedType) === UserTypeId.CUSTOMER && (
						<CustomBox sx={{ display: 'flex', gap: 2 }}>
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
						</CustomBox>
					)}
					<CustomBox mt={2}>
						<Button
							variant="contained"
							type="submit"
							sx={{ borderRadius: "12px", px: 4 }}
						>
							{userToEdit ? 'Salvar' : 'Criar Usuário'}
						</Button>
					</CustomBox>
        </form>
      </DialogContent>
    </Dialog>
  );
}

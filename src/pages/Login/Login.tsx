import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../schemas/login.schema';
import { setUser } from '../../store/slices/authSlice';
import { setToken } from '../../utils/token';
import { 
  CustomButton, 
  CustomInput, 
  CustomPaper, 
  CustomText 
} from '../../components';
import { type UserBasicInfo } from '../../features/user/userTypes';
import { setCurrentCustomer, setCustomers } from '../../store/slices/customerSlice';
import { isCustomer, isTechnician } from '../../utils/roles';
import AuthService from '../../services/AuthService';
import CustomerService from '../../services/CustomerService';
import { setTechnician } from '../../store/slices/technicianSlice';
import TechnicianService from '../../services/TechnicianService';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = async (user: UserBasicInfo, token: string) => {
    dispatch(setUser(user));
    setToken(token);

    if (isCustomer(user.userType)) {
      try {
        const customer = await CustomerService.getCustomerByUserId(user.userId);
        dispatch(setCurrentCustomer(customer));
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao buscar customer:', error);
      }
    } else if (isTechnician(user.userType)) {
      const technician = await TechnicianService.getTechnicianByUserId(user.userId);
      dispatch(setTechnician(technician));
      navigate('/dashboard');
    }
    else {
      try {
        const customers = await CustomerService.getAllCustomers();
        dispatch(setCustomers(customers));
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao buscar customers:', error);
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginSchema) => AuthService.login(data),
    onSuccess: (response) => onSuccess(response.data.user, response.data.token),
    onError: (error: any) => {
      console.error('Login error:', error);
    }
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <CustomPaper>
      <CustomText>Bem-vindo de volta</CustomText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Email"
          placeholder="Insira seu e-mail"
          register={register('email')}
          fieldError={errors.email}
        />
        <CustomInput
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          register={register('password')}
          fieldError={errors.password}
        />
        <CustomButton type="submit" disabled={isPending}>
          Entrar
        </CustomButton>
      </form>
      <p>
        Não tem uma conta?{' '}
        <a href="/register">
          Criar conta
        </a>
      </p>
    </CustomPaper>
  );
};

export default Login;

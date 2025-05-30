import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginSchema } from '../../schemas/login.schema';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUser } from '../../store/slices/authSlice';
import { setToken } from '../../utils/token';
import { 
  CustomButton, 
  CustomInput, 
  CustomPaper, 
  CustomText 
} from '../../components';
import AuthService from '../../services/AuthService';

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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginSchema) => AuthService.login(data),
    onSuccess: (response) => {
      dispatch(setUser(response.data.user))
      setToken(response.data.token)
      navigate('/dashboard');
    },
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
          name="email"
          label="Email"
          placeholder="Insira seu e-mail"
          register={register('email')}
          fieldError={errors.email}
        />
        <CustomInput
          name="password"
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

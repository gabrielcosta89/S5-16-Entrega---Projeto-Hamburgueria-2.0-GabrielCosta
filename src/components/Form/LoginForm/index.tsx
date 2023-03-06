import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../provider/userContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const schema = yup
  .object({
    email: yup.string().required('campo obrigatório')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"email invalido"),
    password: yup.string().required('campo obrigatório'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const { loginUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    loginUser(data)
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.email?.message} register={{ ...register('email') }} label='Login' type='text' />
      <Input error={errors.password?.message}
        register={{ ...register('password') }}
        label='Password'
        type='password'
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;

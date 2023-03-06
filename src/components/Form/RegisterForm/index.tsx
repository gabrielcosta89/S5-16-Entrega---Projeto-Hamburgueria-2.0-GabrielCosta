import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../provider/userContext';

const schema = yup
  .object({
    email: yup
      .string()
      .required('campo obrigatório')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email invalido'),
    password: yup.string().required('campo obrigatório'),
    name: yup.string().required('campo obrigatório'),
    confirmPassword: yup
      .string()
      .required('campo obrigatório')
      .oneOf([yup.ref('password')], 'Senhas não coincidem'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const RegisterForm = () => {
  const { registerUser } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    registerUser(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.name?.message}
        register={{ ...register('name') }}
        label='Nome'
        type='text'
      />
      <Input
        error={errors.email?.message}
        register={{ ...register('email') }}
        label='Email'
        type='text'
      />
      <Input
        error={errors.password?.message}
        register={{ ...register('password') }}
        label='Senha'
        type='password'
      />
      <Input
        error={errors.confirmPassword?.message}
        register={{ ...register('confirmPassword') }}
        label='Confirmar senha'
        type='password'
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;

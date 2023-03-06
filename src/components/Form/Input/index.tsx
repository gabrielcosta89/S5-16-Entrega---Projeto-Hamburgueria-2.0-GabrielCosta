import { UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface inputProps {
  label: string;
  type: string;
  register: UseFormRegisterReturn<string>;
  error: string | undefined;
}

const Input = ({ label, register, type, error }: inputProps) => (
  <fieldset>
    <StyledTextField {...register} label={label} type={type} />
    <StyledParagraph fontColor='red'>
      {typeof error === 'string' ? error : null}
    </StyledParagraph>
  </fieldset>
);

export default Input;

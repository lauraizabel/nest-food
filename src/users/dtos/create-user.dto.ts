import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { DefaultErrors } from 'src/common/errors-common';

export class CreateUserDTO {
  @IsNotEmpty({
    message: DefaultErrors.isEmpty('e-mail'),
  })
  @IsEmail(
    {},
    {
      message: DefaultErrors.invalid('e-mail'),
    },
  )
  @MaxLength(255, {
    message: DefaultErrors.maxLength('O endereço de e-mail', 255),
  })
  email: string;

  @IsNotEmpty({
    message: DefaultErrors.isEmpty('nome'),
  })
  @MaxLength(255, {
    message: DefaultErrors.maxLength('O nome', 255),
  })
  name: string;

  @IsNotEmpty({
    message: DefaultErrors.isEmpty('nome de usuário'),
  })
  @MaxLength(255, {
    message: DefaultErrors.maxLength('O nome de usuário', 255),
  })
  username: string;

  @IsNotEmpty({
    message: DefaultErrors.isEmpty('senha'),
  })
  @MinLength(6, {
    message: DefaultErrors.minLength('A senha', 6),
  })
  password: string;

  @IsNotEmpty({
    message: DefaultErrors.isEmpty('senha'),
  })
  @MinLength(6, {
    message: DefaultErrors.minLength('A senha', 6),
  })
  passwordConfirmation: string;
}

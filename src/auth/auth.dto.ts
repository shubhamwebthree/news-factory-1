import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsOptional()
  @IsString()
  walletAddress?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @IsOptional()
  @IsString()
  token?: string;
}

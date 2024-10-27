import { IsString } from 'class-validator';
export class AuthDto {
	@IsString()
	email: string;
	@IsString()
	password: string;
	@IsString()
	name: string;
	@IsString()
	phone: string;
	@IsString()
	role: string;
}

export class LoginDto {
	@IsString()
	email: string;
	@IsString()
	password: string;
}

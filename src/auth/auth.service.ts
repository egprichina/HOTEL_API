import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthModel } from '../users/schemas/auth.schema';
import { AuthDocument } from '../users/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSaltSync, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) { }

	async createUser(dto: AuthDto) {
		const oldUser = await this.usersService.findUser(dto.email);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.usersService.createUser(dto);
	}

	// Проверка пользователя
	async validateUser(email: string, password: string): Promise<Pick<AuthModel, 'email'>> {
		const user = await this.usersService.findUser(email);
		if (!user) {
			throw new UnauthorizedException('USER_NOT_FOUND_ERROR');
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException('WRONG_PASSWORD_ERROR');
		}
		return { email: user.email };
	}
	async login(email: string) {
		const user = await this.usersService.findUser(email);
		if (!user) {
			throw new UnauthorizedException('USER_NOT_FOUND_ERROR');
		}
		const payload = { email, role: user.role };
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
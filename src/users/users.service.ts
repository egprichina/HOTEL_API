import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare, genSaltSync, hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
	constructor(@InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
		private readonly jwtService: JwtService
	) { }

	async createUser(dto: AuthDto) {
		const salt = await genSaltSync(10);
		const newUser = new this.authModel({
			email: dto.email,
			passwordHash: await hash(dto.password, salt),
			name: dto.name,
			phone: dto.phone,
			role: dto.role

		});
		return newUser.save();
	}

	async findUser(email: string) {
		// const user = await this.authModel.findOne({ where: { login: email } }).exec();
		return this.authModel.findOne({ email }).exec();
	}

	// Проверка пользователя
	async validateUser(email: string, password: string): Promise<Pick<AuthModel, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException('USER_NOT_FOUND_ERROR');
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException('WRONG_PASSWORD_ERROR');
		}
		return { email: user.email };
	}

}

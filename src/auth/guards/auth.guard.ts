import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Injectable()

export class AvtorizGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		
		const requiredRole = this.reflector.getAllAndOverride<String[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRole) {
			return true;
		}

		const auth = await super.canActivate(context);
		if (!auth) return auth;

		const { user } = context.switchToHttp().getRequest();
        console.log(user.role);
		console.log(requiredRole);
		return requiredRole.includes(user.role);
	}
}	

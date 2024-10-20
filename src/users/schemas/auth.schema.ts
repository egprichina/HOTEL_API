import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema()
export class AuthModel {
	@Prop({ required: true })
	email: string;
	@Prop({ required: true })
	passwordHash: string;
	@Prop({ required: true })
	name: string;
	@Prop({ required: true })
	phone: string;
	@Prop({ required: true })
	role: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);

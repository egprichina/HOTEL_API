import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservDocument = HydratedDocument<Reserv>;

@Schema()
export class Reserv {
	@Prop({ required: true })
	date: Date;
	@Prop({ required: true })
	room: number;
	@Prop()
	man: string;
}

export const ReservSchema = SchemaFactory.createForClass(Reserv);

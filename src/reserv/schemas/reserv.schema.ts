import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/room/schemas/room.schema';

export type ReservDocument = HydratedDocument<Reserv>;

@Schema()
export class Reserv {
	@Prop({ required: true })
	date: Date;
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
	room: Room;
	@Prop()
	man: string;
}

export const ReservSchema = SchemaFactory.createForClass(Reserv);

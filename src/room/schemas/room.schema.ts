import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
	@Prop({ required: true })
	number: number;
	@Prop()
	descrRoom: string;
	@Prop({ required: true })
	type: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

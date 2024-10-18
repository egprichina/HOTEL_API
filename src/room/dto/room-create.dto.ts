import { IsNumber, IsString } from 'class-validator';

export class RoomCreateDto {
	@IsNumber()
	number: number;
	@IsString()
	descrRoom: string;
	@IsString()
	type: string;
}

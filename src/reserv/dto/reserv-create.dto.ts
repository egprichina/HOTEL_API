import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReservCreateDto {
	@IsDate()
	date: Date;
	@IsNumber()
	room: number;
	@IsString()
	man: string;
}

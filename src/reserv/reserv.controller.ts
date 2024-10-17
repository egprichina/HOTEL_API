import {
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Body,
	Param,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { RESERVED_NOT_FOUND } from './reserv.constants';
import { ReservCreateDto } from './dto/reserv-create.dto';
import { ReservUpdateDto } from './dto/reserv-update.dto';
import { ReservService } from './reserv.service';

@Controller('reserv')
export class ReservController {
	constructor(private readonly reservService: ReservService) {}

	@Get(':id')
	async get(@Param('id') id: string) {
		const room = await this.reservService.get(id);
		if (!room) throw new HttpException(RESERVED_NOT_FOUND, HttpStatus.NOT_FOUND);
		return room;
	}

	@Post()
	async create(@Body() dto: ReservCreateDto) {
		return await this.reservService.create(dto);
	}

	@Get()
	async getAll() {
		return await this.reservService.getAll();
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deleteReserv = await this.reservService.delete(id);
		if (!deleteReserv) throw new HttpException(RESERVED_NOT_FOUND, HttpStatus.NOT_FOUND);
		return deleteReserv;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: ReservUpdateDto) {
		try {
			const room = await this.reservService.update(id, dto);
			if (!room) throw new HttpException(RESERVED_NOT_FOUND, HttpStatus.NOT_FOUND);
			return room;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.CONFLICT);
		}
	}

	@Get('byRoom/:id')
	async getByRoom(@Param('id') id: string) {
		return await this.reservService.getByRoom(id);
	}
}

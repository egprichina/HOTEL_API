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
	UseGuards,
	Query,
} from '@nestjs/common';
import { RESERVED_NOT_FOUND } from './reserv.constants';
import { ReservCreateDto } from './dto/reserv-create.dto';
import { ReservUpdateDto } from './dto/reserv-update.dto';
import { ReservService } from './reserv.service';
import { Roles } from '../decorators/role.decorator';
import { AvtorizGuard } from '../auth/guards/auth.guard';

@Controller('reserv')
export class ReservController {
	constructor(private readonly reservService: ReservService) {}

	@Get('byPeriod')
	async getStatistic(@Query('gjahr') gjahr: number,
		@Query('month') month: number) {
		return await this.reservService.getStatistic(gjahr, month);
	};

	@Get(':id')
	@Roles(["admin", "user"])
	@UseGuards(AvtorizGuard)
	async get(@Param('id') id: string) {
		const room = await this.reservService.get(id);
		if (!room) throw new HttpException(RESERVED_NOT_FOUND, HttpStatus.NOT_FOUND);
		return room;
	}

	@Post()
	@Roles(["admin", "user"])
	@UseGuards(AvtorizGuard)
	async create(@Body() dto: ReservCreateDto) {
		return await this.reservService.create(dto);
	}

	@Get()
	@Roles(["admin", "user"])
	@UseGuards(AvtorizGuard)
	async getAll() {
		return await this.reservService.getAll();
	}

	@Delete(':id')
	@Roles(["admin"])
	@UseGuards(AvtorizGuard)
	async delete(@Param('id') id: string) {
		const deleteReserv = await this.reservService.delete(id);
		if (!deleteReserv) throw new HttpException(RESERVED_NOT_FOUND, HttpStatus.NOT_FOUND);
		return deleteReserv;
	}

	@Patch(':id')
	@Roles(["admin", "user"])
	@UseGuards(AvtorizGuard)
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
	@Roles(["admin"])
	@UseGuards(AvtorizGuard)
	async getByRoom(@Param('id') id: string) {
		return await this.reservService.getByRoom(id);
	}

}

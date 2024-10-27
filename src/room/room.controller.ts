import {
	Controller,
	Param,
	Get,
	Post,
	Body,
	Delete,
	Patch,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { RoomCreateDto } from './dto/room-create.dto';
import { RoomService } from './room.service';
import { RoomUpdateDto } from './dto/room-update.dto';
import { ROOM_NOT_FOUND } from './room.constants';
import { Roles } from '../decorators/role.decorator';
import { AvtorizGuard } from '../auth/guards/auth.guard';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Get(':id')
	@Roles(["admin", "user"])
	@UseGuards(AvtorizGuard)
	async get(@Param('id') id: string) {
		const room = await this.roomService.get(id);
		if (!room) throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		return room;
	}
	@UsePipes(new ValidationPipe())
	@Post()
	@Get(':id')
	@Roles(["admin"])
	@UseGuards(AvtorizGuard)
	async create(@Body() dto: RoomCreateDto) {
		return await this.roomService.create(dto);
	}

	@Get()
	@Get(':id')
	@Roles(["admin", "user"])
	@UseGuards(AvtorizGuard)
	async getAll() {
		return await this.roomService.getAll();
	}

	@Delete(':id')
	@Get(':id')
	@Roles(["admin"])
	@UseGuards(AvtorizGuard)
	async delete(@Param('id') id: string) {
		const deletedRoom = await this.roomService.delete(id);
		if (!deletedRoom) throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		return deletedRoom;
	}

	@Patch(':id')
	@Get(':id')
	@Roles(["admin"])
	@UseGuards(AvtorizGuard)
	async update(@Param('id') id: string, @Body() dto: RoomUpdateDto) {
		const room = await this.roomService.update(id, dto);
		if (!room) throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		return room;
	}
}

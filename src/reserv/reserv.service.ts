import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reserv, ReservDocument } from './schemas/reserv.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReservCreateDto } from './dto/reserv-create.dto';
import { ReservUpdateDto } from './dto/reserv-update.dto';
import { RESERVED } from './reserv.constants';

@Injectable()
export class ReservService {
	constructor(@InjectModel(Reserv.name) private reservModel: Model<ReservDocument>) {}

	async create(dto: ReservCreateDto): Promise<ReservDocument> {
		// проверка брони номера на дату
		const alwaysReserved = await this.reservModel.findOne({ room: dto.room, date: dto.date });
		if (alwaysReserved) throw new HttpException(RESERVED, HttpStatus.BAD_REQUEST);

		return this.reservModel.create(dto);
	}

	async get(id: string): Promise<ReservDocument | null> {
		return this.reservModel.findById(id).exec();
	}

	async getAll(): Promise<ReservDocument[]> {
		return this.reservModel.find().exec();
	}

	async update(id: string, dto: ReservUpdateDto): Promise<ReservDocument | null> {
		const alwaysReserved = await this.reservModel.findOne({ room: dto.room, date: dto.date });
		if (alwaysReserved) throw new Error(RESERVED);

		return this.reservModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async delete(id: string): Promise<ReservDocument | null> {
		return this.reservModel.findByIdAndDelete(id).exec();
	}

	async getByRoom(id: string): Promise<ReservDocument[]> {
		return this.reservModel.find({ room: id }).exec();
	}
}

import { Module } from '@nestjs/common';
import { ReservController } from './reserv.controller';
import { ReservService } from './reserv.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserv, ReservSchema } from './schemas/reserv.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Reserv.name, schema: ReservSchema }])],
	controllers: [ReservController],
	providers: [ReservService],
})
export class ReservModule {}

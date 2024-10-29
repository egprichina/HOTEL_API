import { Module } from '@nestjs/common';
import { ReservController } from './reserv.controller';
import { ReservService } from './reserv.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserv, ReservSchema } from './schemas/reserv.schema';
import { TelegramModule } from 'src/telegram/telegram.module';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: Reserv.name, schema: ReservSchema }]), TelegramModule, UsersModule],
	controllers: [ReservController],
	providers: [ReservService],
})
export class ReservModule {}

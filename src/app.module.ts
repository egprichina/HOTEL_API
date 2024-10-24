import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { ReservModule } from './reserv/reserv.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		RoomModule,
		ReservModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		UsersModule,
		AuthModule,
		FilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

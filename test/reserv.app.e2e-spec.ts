import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ReservCreateDto } from '../src/reserv/dto/reserv-create.dto';
import { disconnect } from 'mongoose';

const testDtoReserv: ReservCreateDto = {
	date: new Date('2024-01-01'),
	room: 28,
	man: 'Иванов Иван Иванович',
};

const login={email: "ivanov@mail.ru", password:"12345"};
let token = "";

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		await request(app.getHttpServer())
			.post('/auth/login')
			.send(login)
			.then(({ body }: request.Response) => {
				token = body.access_token;
			});
	});

	// Тест бронирования
	it('/reserv (POST) - success', async () => {
		return await request(app.getHttpServer())
			.post('/reserv')
			.send(testDtoReserv)
			.set('Authorization', 'Bearer ' + token)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/reserv (POST) - fail', async () => {
		return await request(app.getHttpServer())
		.post('/reserv')
		.set('Authorization', 'Bearer ' + token)
		.send(testDtoReserv).expect(400);
	});

	it('/reserv/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/reserv/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	afterAll(() => {
		disconnect();
	});
});

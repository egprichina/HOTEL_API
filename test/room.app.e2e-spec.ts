import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RoomCreateDto } from '../src/room/dto/room-create.dto';
import { disconnect } from 'mongoose';

const testDto: RoomCreateDto = {
	number: 28,
	descrRoom: 'Большая, светлая',
	type: 'Люкс',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// it('/ (GET)', () => {
	// 	return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
	// });

	// Тест создания номера
	it('/room (POST) - success', async () => {
		return await request(app.getHttpServer())
			.post('/room')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/room (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/room')
			.send({ ...testDto, number: 'not_number' })
			.expect(400);
	});
	/* 	//Тест на дубль номера комнаты
	// it('/room (POST)', async () => {
	// 	return await request(app.getHttpServer()).post('/room').send(testDto).expect(500);
	// }); */

	it('/room/:id (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/room/' + createdId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.number).toBe(testDto.number);
			});
	});

	/* 	// it('/room/:id (GET) - fail', async () => {
	// 	return request(app.getHttpServer())
	// 		.get('/room/' + createdId)
	// 		.expect(200)
	// 		.then(({ body }: request.Response) => {
	// 			expect(body.number).toBe(58);
	// 		});
	// }); */

	it('/room/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/room/' + createdId)
			.expect(200);
	});

	// it('/room/:id (DELETE) - fail', () => {
	// 	return request(app.getHttpServer())
	// 		.delete('/room/' + 58)
	// 		.expect(404);
	// });

	afterAll(() => {
		disconnect();
	});
});

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

const login = { email: "ivanov@mail.ru", password: "12345" };
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

	// it('/ (GET)', () => {
	// 	return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
	// });

	// Тест создания номера
	it('/room (POST) - success', async () => {
		return await request(app.getHttpServer())
			.post('/room')
			.send(testDto)
			.set('Authorization', 'Bearer ' + token)
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
			.set('Authorization', 'Bearer ' + token)
			.expect(400);
	});

	//Тест на дубль номера комнаты
	it('/room (POST)', async () => {
		return await request(app.getHttpServer()).post('/room')
		.send(testDto)
		.set('Authorization', 'Bearer ' + token)
		.expect(500);
	});

	it('/room/:id (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/room/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.number).toBe(testDto.number);
			});
	});

	it('/room/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/room/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/room/:id (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/room/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.number).toBeUndefined();
			});
	});

	it('/room/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/room/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(404);
	});

	afterAll(() => {
		disconnect();
	});
});

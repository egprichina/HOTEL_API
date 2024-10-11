import { Test, TestingModule } from '@nestjs/testing';
import { ReservController } from './reserv.controller';

describe('ReservController', () => {
	let controller: ReservController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ReservController],
		}).compile();

		controller = module.get<ReservController>(ReservController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

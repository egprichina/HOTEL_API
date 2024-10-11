import { Test, TestingModule } from '@nestjs/testing';
import { ReservService } from './reserv.service';

describe('ReservService', () => {
	let service: ReservService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ReservService],
		}).compile();

		service = module.get<ReservService>(ReservService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

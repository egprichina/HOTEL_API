import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AvtorizGuard } from '../auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';


@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService
	) {}

    @Post('upload')
	@HttpCode(200) 
	@UseGuards(AvtorizGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)]
		if (file.mimetype.includes('image')) {
			const buffer = await this.filesService.convertResize(file.buffer);
			saveArray.push(new MFile({ 
				originalname: `${file.originalname.split('.')[0]}resize.jpg`,
				buffer
			}));

		}
		return this.filesService.saveFiles(saveArray);
	}

}

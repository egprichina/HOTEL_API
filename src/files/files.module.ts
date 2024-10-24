import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'app-root-path';

@Module({
  imports: [ServeStaticModule.forRoot({
    // rootPath: 'D:\\Projects\\API_HOTEL\\uploads'
    // rootPath: `${path}/uploads`   
  rootPath: `${process.cwd()}\\uploads`})],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}

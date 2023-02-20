import { AppConfigModule } from './config/app/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrawSomethingModule } from './draw-something/draw-something.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppConfigModule, DrawSomethingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

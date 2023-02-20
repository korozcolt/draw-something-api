import { DrawSomethingController } from './controllers/draw-something.controller';
import { DrawSomethingService } from './services/draw-something.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DrawSomethingController],
  providers: [DrawSomethingService],
})
export class DrawSomethingModule {}

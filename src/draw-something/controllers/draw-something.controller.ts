import { Controller, Post, Body } from '@nestjs/common';
import { DrawSomethingDto } from '../dto/draw-something.dto';
import { DrawSomethingService } from '../services/draw-something.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('draw-something')
@Controller('draw-something')
export class DrawSomethingController {
  constructor(private readonly drawSomethingService: DrawSomethingService) {}

  @Post()
  @ApiBody({ type: DrawSomethingDto })
  getWords(@Body() drawSomethingDto: DrawSomethingDto): string[] {
    const { letters, wordLength } = drawSomethingDto;
    return this.drawSomethingService.getWordsFromLettersAndLength(
      letters,
      wordLength,
    );
  }
}

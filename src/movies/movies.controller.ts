import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  Body,
} from '@nestjs/common';
import { Movie } from './entities/movie.entitiy';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //gets
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  //get
  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return this.moviesService.getOne(movieId);
  }

  //생성
  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  //삭제
  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  //업데이트
  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}

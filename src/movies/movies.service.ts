import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entitiy';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID $${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id); // 404 -> NotFoundException, then break
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData) {
    const movie = this.getOne(id); // 404 -> NotFoundException, then break
    this.deleteOne(id); // 기존 데이터  삭제
    this.movies.push({ ...movie, ...updateData }); // push를 해도 중복이 안된다..?
  }
}

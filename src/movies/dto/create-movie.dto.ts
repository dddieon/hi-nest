import { IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true }) //배열의 모든 요소를 체크하는 속성
  readonly generes: string[];
}

import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class UserDto {

  @IsString({ message: `User's name should be a string` })
  @Transform(({ value }): string => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: `User's name should not be empty` })
  @MinLength(5, { message: `User's name should be of minimum 1 characters` })
  @MaxLength(50, { message: `User's name should be of maximum 50 characters` })
  @Matches(/^[a-zA-Z_ ]*$/, { message: `User's name should only contain alphabets` })
  name: string;

  @IsEmail()
  @Transform(({ value }): string => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: `User's email should not be empty` })
  @IsEmail({}, { message: 'Email should be valid' })
  @MaxLength(100, { message: `User's email should be of maximum 100 characters` })
  email: string;

}


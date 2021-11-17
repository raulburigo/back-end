import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ContactsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumberString()
  @Length(13, 13)
  cellphone: string;
}

export class CreateContactsDto {
  @ApiProperty({ type: () => [ContactsDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ContactsDto)
  contacts: ContactsDto[];
}

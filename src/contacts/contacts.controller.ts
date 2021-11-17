import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';
import { CreateContactsDto } from './dto/create-contact.dto';

@Controller('contacts')
@ApiTags('contacts')
@ApiBearerAuth()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getContacts(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createContacts(
    @Body() createContactDto: CreateContactsDto,
  ): Promise<Contact[]> {
    return this.contactsService.create(createContactDto);
  }
}

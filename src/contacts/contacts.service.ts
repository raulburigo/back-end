import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getManager } from 'typeorm';

import { Contact } from './contact.entity';
import { CreateContactsDto } from './dto/create-contact.dto';

@Injectable({ scope: Scope.REQUEST })
export class ContactsService {
  constructor(
    @Inject(REQUEST)
    private readonly request,
  ) {}

  async findAll(): Promise<Contact[]> {
    const contactsRepository = getManager(
      this.request.user.username,
    ).getRepository(Contact);
    return contactsRepository.find();
  }

  async create(createContactDto: CreateContactsDto): Promise<Contact[]> {
    const contactsRepository = getManager(
      this.request.user.username,
    ).getRepository(Contact);

    if (this.request.user.username == 'macapa') {
      for (const contactDto of createContactDto.contacts) {
        contactDto.name = contactDto.name.toUpperCase();
        contactDto.cellphone = contactDto.cellphone.replace(
          /(\d{2})(\d{2})(\d{5})(\d{4})/,
          '+$1 ($2) $3-$4',
        );
      }
    }

    return await contactsRepository.save(createContactDto.contacts);
  }
}

import { Injectable, Scope, Inject, HttpException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TokensService } from 'src/tokens/tokens.service';

import { Contact } from './contact.entity';
import { CreateContactsDto } from './dto/create-contact.dto';

@Injectable({ scope: Scope.REQUEST })
export class ContactsService {
  constructor(
    @Inject(REQUEST)
    private readonly request,
    private tokensService: TokensService,
  ) {}

  async findAll(): Promise<Contact[]> {
    const contactsRepository = await this.tokensService.getCustomRepository(
      this.request.user.username,
      Contact,
    );

    return contactsRepository.find();
  }

  async create(createContactDto: CreateContactsDto): Promise<Contact[]> {
    const contactsRepository = await this.tokensService.getCustomRepository(
      this.request.user.username,
      Contact,
    );

    if (this.request.user.username == 'macapa') {
      for (const contactDto of createContactDto.contacts) {
        contactDto.name = contactDto.name.toUpperCase();
        contactDto.cellphone = contactDto.cellphone.replace(
          /(\d{2})(\d{2})(\d{5})(\d{4})/,
          '+$1 ($2) $3-$4',
        );
      }
    }

    if (
      this.request.user.username == 'varejao' &&
      createContactDto.contacts.some((contact) => {
        contact.name.length > 100;
      })
    ) {
      throw new HttpException(
        `contacts names must be shorter than or equal to 100 characters`,
        400,
      );
    }

    return await contactsRepository.save(createContactDto.contacts);
  }
}

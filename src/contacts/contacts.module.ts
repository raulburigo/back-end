import { Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [TokensModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {
  constructor(private contactsService: ContactsService) {}
}

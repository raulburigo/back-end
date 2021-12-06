import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { AppController } from './app.controller';

import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Token } from './tokens/token.entity';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      synchronize: false,
      autoLoadEntities: true,
      entities: [Token],
      username: 'admin',
      password: 'admin',
      database: 'admin',
    }),
    ContactsModule,
    UsersModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

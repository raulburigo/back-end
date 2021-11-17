import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { AppController } from './app.controller';

import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { Contact } from './contacts/contact.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      synchronize: false,
      autoLoadEntities: true,
      entities: [Contact],
      username: 'admin',
      password: 'admin',
      database: 'admin',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'macapa',
      host: 'localhost',
      port: 3306,
      synchronize: false,
      autoLoadEntities: true,
      entities: [Contact],
      username: 'admin',
      password: 'admin',
      database: 'admin',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: 'varejao',
      host: 'localhost',
      port: 5432,
      synchronize: false,
      autoLoadEntities: true,
      entities: [Contact],
      username: 'admin',
      password: 'admin',
      database: 'admin',
    }),
    ContactsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

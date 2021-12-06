import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text')
  name: string;

  @Column('text')
  type: 'mysql' | 'postgres';

  @Column('text')
  host: string;

  @Column('int')
  port: number;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  database: string;
}

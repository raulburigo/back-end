import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', name: 'nome' })
  name: string;

  @Column({ type: 'text', name: 'celular' })
  cellphone: string;
}

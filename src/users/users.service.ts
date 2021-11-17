import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  username: string;
  password?: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'macapa',
      password: 'macapa',
    },
    {
      userId: 2,
      username: 'varejao',
      password: 'varejao',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

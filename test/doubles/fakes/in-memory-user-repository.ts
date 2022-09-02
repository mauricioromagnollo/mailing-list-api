import { UserRepository } from '@/usecases/ports';
import { UserData } from '@/domain/entities';

export class InMemoryUserRepository implements UserRepository {
  private usersRepository: UserData[];

  constructor(usersRepository: UserData[]) {
    this.usersRepository = usersRepository;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);

    if (!exists) {
      this.usersRepository.push(user);
    }
  }

  async findUserByEmail(email: string): Promise<UserData> {
    return this.usersRepository.find((user) => user.email === email) ?? null;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.usersRepository;
  }

  async exists(user: UserData): Promise<boolean> {
    const exists = await this.findUserByEmail(user.email);
    return (!!exists);
  }
}

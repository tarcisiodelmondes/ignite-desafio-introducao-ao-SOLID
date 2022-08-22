import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    const turnedUserOnAdmin = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    const newUserListWithNewAdmin = this.users.map((user) => {
      if (user.id === receivedUser.id) {
        return turnedUserOnAdmin;
      }

      return user;
    });

    this.users = newUserListWithNewAdmin;

    return turnedUserOnAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isUserExists = this.usersRepository.findById(user_id);

    if (!isUserExists) {
      throw new Error("Error user not exists");
    }

    if (!isUserExists.admin) {
      throw new Error("Error user is not admin");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const isUserExists = this.usersRepository.findById(user_id);

    if (!isUserExists) {
      throw new Error("Error user not exists");
    }

    const userTurnedOnAdmin = this.usersRepository.turnAdmin(isUserExists);

    return userTurnedOnAdmin;
  }
}

export { TurnUserAdminUseCase };

import userRepo from '../repos/userRepo';
import User from '../modules/User';

class UserService {
  constructor(
    private repo = userRepo,
  ) {}

  // find the user with the given name
  async findUserName(userName: string): Promise<User | undefined> {
    const user = await this.repo.getUser(userName);
    return user;
  }

  // adds new user to database
  // Returns true on successful registration, false otherwise
  async register(userName: string, password: string): Promise<boolean> {
    const user = await this.findUserName(userName);
    if(user) {
      console.log('User name already taken\n');
      return false;
    }

    return this.repo.addUser(new User(userName, password, 'Employee'));
  }

  // checks if a user exists in the DB and the password is correct then sets currentUser
  // returns true on successful login false otherwise
  async login(userName: string, password: string): Promise<User | undefined> {
    const loginUser = await this.findUserName(userName);

    if(!loginUser) {
      console.log('User does not exist\n');
    } else if(loginUser.password !== password) {
      console.log('Password is incorrect\n');
    }

    return loginUser;
  }

  async adjustReimbursment(user: User, amountToAdjust: number): Promise<boolean> {
    if(user.role !== 'Employee') {
      return false;
    }

    // eslint-disable-next-line no-param-reassign
    user.reimbursment += amountToAdjust;

    return this.repo.updateUser(user);
  }
}

export default new UserService();

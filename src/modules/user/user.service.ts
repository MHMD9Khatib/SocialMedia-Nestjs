import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SignupDto, LoginDto } from './dto';
import { User } from 'src/common/types';
import { ERRORS, PROVIDERS } from 'src/common/constants/index';
import {
  generateToken,
  hashPassword,
  comparePassword,
} from 'src/common/utils/index';

import { Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USERS_PROVIDER)
    private readonly usersRepository: typeof Users,
  ) {}

  async getPatientName(id: number): Promise<{
    username: string;
  }> {
    const patient = await this.usersRepository.findOne({
      where: { id },
    });
    return { username: patient?.username };
  }

  async getUserByUserNameOrEmail(userNameOrEmail: {
    email?: string;
    userName?: string;
  }): Promise<Users> {
    const where: any = {};
    if (userNameOrEmail.email) {
      where.email = userNameOrEmail.email;
    } else if (userNameOrEmail.userName) {
      where.userName = userNameOrEmail.userName;
    }

    return this.usersRepository.findOne({
      where: {
        ...where,
      },
    });
  }

  async signup(newUserInfo: SignupDto): Promise<User> {
    try {
      const userWithSameEmailOrUsername = await this.getUserByUserNameOrEmail({
        email: newUserInfo.email,
        userName: newUserInfo.username,
      });
      if (userWithSameEmailOrUsername) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: ERRORS.USER_ALREADY_EXISTS,
          },
          HttpStatus.CONFLICT,
        );
      }
      newUserInfo.password = await hashPassword(newUserInfo.password);
      const newUser = await this.usersRepository.create({
        ...newUserInfo,
      });
      return {
        user: {
          id: newUser.id,
          role: newUser.role,
          email: newUser.email,
          userName: newUser.username,
        },
        token: generateToken(newUser.username),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async login(loginInfo: LoginDto): Promise<User> {
    try {
      const user = await this.getUserByUserNameOrEmail({
        email: loginInfo.email,
      });
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ERRORS.INCORRECT_DATA,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const isPasswordCorrect = await comparePassword(
        loginInfo.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ERRORS.INCORRECT_DATA,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
          userName: user.username,
        },
        token: generateToken(user.username),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

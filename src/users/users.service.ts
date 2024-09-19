import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDTO } from './input/updateProfile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updateProfile(user: User, updateProfileDTO: UpdateProfileDTO) {
    // console.log(user)
    // console.log(updateProfileDTO)
    for (let key of Object.keys(updateProfileDTO)) {
      user[key] = updateProfileDTO[key];
    }
    return await this.userRepository.save(user);
  }
}

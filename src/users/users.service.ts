import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { UpdateProfileDTO } from './input/updateProfile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updateProfile(user: User, updateProfileDTO: UpdateProfileDTO) {
    for (let key of Object.keys(updateProfileDTO)) {
      user[key] = updateProfileDTO[key];
    }
    return await this.userRepository.save(user);
  }
  async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
  async getListUser() {
    return await this.userRepository.find();
  }
  async activeUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = true;
    return await this.userRepository.save(user);
  }
  async deactiveUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = false;
    return await this.userRepository.save(user);
  }
  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.softDelete(id);
  }

  async getListUserWithDelete() {
    return await this.userRepository.find({ withDeleted: true });
  }
  async getListUserDelete() {
    return await this.userRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }
  async getListUserActive() {
    return await this.userRepository.find({ where: { isActive: true } });
  }
  async getListUserDeactive() {
    return await this.userRepository.find({ where: { isActive: false } });
  }
}

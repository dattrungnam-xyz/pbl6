import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './input/createComment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { Comment } from './entity/comment.entity';
import { UpdateCommentDTO } from './input/updateComment.dto';
import { Role } from '../type/role.type';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async createComment(userId: string, createCommentDTO: CreateCommentDTO) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const newComment = new Comment();
    newComment.user = Promise.resolve(user);
    Object.assign(newComment, createCommentDTO);
    return await this.commentRepository.save(newComment);
  }
  async updateComment(
    idComment: string,
    updateCommentDTO: UpdateCommentDTO,
    idUser: string,
  ) {
    const comment = await this.commentRepository.findOne({
      where: { id: idComment },
      relations: ['user'],
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if ((await comment.user).id !== idUser) {
      throw new Error('User not allowed to update this comment');
    }
    return await this.commentRepository.save(
      new Comment({ ...comment, ...updateCommentDTO }),
    );
  }
  async deleteComment(idComment: string, idUser: string) {
    const comment = await this.commentRepository.findOne({
      where: { id: idComment },
      relations: ['user'],
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (
      (await comment.user).id !== idUser &&
      !(await comment.user).roles.includes(Role.ADMIN)
    ) {
      throw new Error('User not allowed to delete this comment');
    }
    return await this.commentRepository.softDelete(idComment);
  }
}

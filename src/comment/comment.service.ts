import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDTO } from './input/createComment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { Comment } from './entity/comment.entity';
import { UpdateCommentDTO } from './input/updateComment.dto';
import { Role } from '../common/type/role.type';
import { Question } from '../question/entity/question.entity';
import { Test } from '../test/entity/test.entity';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(GroupTopic)
    private readonly groupTopicRepository: Repository<GroupTopic>,
  ) {}
  async createComment(userId: string, createCommentDTO: CreateCommentDTO) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const newComment = new Comment();
    newComment.user = user;
    if (createCommentDTO.idTest) {
      const test = await this.testRepository.findOneBy({
        id: createCommentDTO.idTest,
      });
      if (!test) {
        throw new NotFoundException('Test not found');
      }
      newComment.test = test;
    } else if (createCommentDTO.idQuestion) {
      const question = await this.questionRepository.findOneBy({
        id: createCommentDTO.idQuestion,
      });
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      newComment.question = question;
    } else if (createCommentDTO.idGroupTopic) {
      const groupTopic = await this.groupTopicRepository.findOneBy({
        id: createCommentDTO.idGroupTopic,
      });
      if (!groupTopic) {
        throw new NotFoundException('Group topic not found');
      }
      newComment.groupTopic = groupTopic;
    } else if (createCommentDTO.idComment) {
      const comment = await this.commentRepository.findOneBy({
        id: createCommentDTO.idComment,
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      newComment.parentComment = comment;
    }
    delete createCommentDTO['rating'];
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
    if (comment.user.id !== idUser) {
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
      comment.user.id !== idUser &&
      !comment.user.roles.includes(Role.ADMIN)
    ) {
      throw new Error('User not allowed to delete this comment');
    }
    return await this.commentRepository.softDelete(idComment);
  }
  async loadSubComment(comment: Comment) {
    let subComments = await this.commentRepository.find({
      where: { parentComment: { id: comment.id } },
      relations: ['user', 'subComment'],
    });
    if (subComments.length > 0) {
      let promise = subComments.map((sub) => {
        return this.loadSubComment(sub);
      });
      let sub = await Promise.all(promise);
      comment.subComment = sub;
    }
    return comment;
  }
  async getComment(id: string, entity: 'test' | 'question' | 'groupTopic') {
    let comments = await this.commentRepository.find({
      relations: ['user', 'subComment', entity],
      where: { [entity]: { id } },
    });

    let commentsPromise = comments.map((comment) => {
      return this.loadSubComment(comment);
    });
    comments = await Promise.all(commentsPromise);
    return comments;
  }
}

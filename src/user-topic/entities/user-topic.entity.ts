import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from '../../user-answer/entity/userAnswer.entity';
import { Question } from '../../question/entity/question.entity';
import { User } from '../../users/entity/user.entity';
import { Topic } from '../../topic/entities/topic.entity';

@Entity()
export class UserTopic {
  constructor(partial?: Partial<UserTopic>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
  
  @OneToOne(()=> User, (user)=> user.userTopic)
  @JoinColumn()
  user: Promise<User>;

  @OneToOne(()=> Topic, topic => topic.userTopic)
  @JoinColumn()
  topic: Promise<Topic>;

  @OneToMany(()=>Question, (question)=> question.topic)
  questions: Promise<Question[]>
}

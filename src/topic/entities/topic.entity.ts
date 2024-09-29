import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from '../../user-answer/entity/userAnswer.entity';
import { Question } from '../../question/entity/question.entity';
import { UserTopic } from '../../user-topic/entities/user-topic.entity';

@Entity()
export class Topic {
  constructor(partial?: Partial<Topic>) {
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
  
  @OneToMany(()=>Question, (question)=> question.topic)
  questions: Promise<Question[]>

  @OneToOne(()=>UserTopic, userTopic => userTopic.topic)
  userTopic: Promise<UserTopic>
}

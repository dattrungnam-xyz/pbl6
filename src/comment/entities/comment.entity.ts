import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from '../../test/entity/test.entity';
import { Part } from '../../part/entity/part.entity';
import { User } from '../../users/entity/user.entity';
import { Question } from '../../question/entity/question.entity';

@Entity()
export class Comment {
  constructor(partial?: Partial<Comment>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  content: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(()=>User, (user)=> user.comments)
  user: Promise<User>;

  @ManyToOne(()=>Question, (question)=> question.comments, {nullable: true })
  question: Promise<Question>;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    nullable: true,
  })
  @Expose()
  subComment?: Promise<Comment[]>;

  @ManyToOne(() => Comment, (comment) => comment.subComment, { nullable: true })
  @Expose()
  parentComment?: Promise<Comment>;
  

}

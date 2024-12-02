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
import { User } from '../../users/entity/user.entity';
import { Test } from '../../test/entity/test.entity';
import { Question } from '../../question/entity/question.entity';
import { GroupTopic } from '../../group-topic/entity/groupTopic.entity';

@Entity()
export class Comment {
  constructor(partial?: Partial<Comment>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  @Expose()
  user: User;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  @Expose()
  content: string;

  @Column({ nullable: true })
  @Expose()
  rating: string;

  @ManyToOne(() => Test, (test) => test.comments, { nullable: true })
  @Expose()
  test?: Test;

  @ManyToOne(() => Question, (question) => question.comments, {
    nullable: true,
  })
  @Expose()
  question?: Question;

  @ManyToOne(() => GroupTopic, (groupTopic) => groupTopic.comments, {
    nullable: true,
  })
  @Expose()
  groupTopic?: GroupTopic;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    nullable: true,
  })
  @Expose()
  subComment?: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.subComment, { nullable: true })
  @Expose()
  parentComment?: Comment;
}

import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entity/question.entity';
import { Submission } from '../../submission/entity/submission.entity';

@Entity()
export class UserAnswer {
  constructor(partial?: Partial<UserAnswer>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ nullable: false })
  userAnswer: string;

  @Expose()
  @JoinColumn()
  @OneToOne(() => Question, (question) => question.userAnswer)
  question: Promise<Question>;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Submission, (sub) => sub.userAnswer)
  submission: Promise<Submission>;
}

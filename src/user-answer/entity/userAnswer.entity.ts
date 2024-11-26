import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entity/question.entity';
import { TestPractice } from '../../test-practice/entity/testPractice.entity';

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
  @ManyToOne(() => Question, (question) => question.userAnswer)
  question: Question;

  @Expose()
  @Column()
  isCorrect: boolean;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @ManyToOne(() => TestPractice, (testPractice) => testPractice.userAnswers)
  testPractice: TestPractice;
}

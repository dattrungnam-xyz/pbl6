import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Test } from '../../test/entity/test.entity';
import { UserAnswer } from '../../user-answer/entity/userAnswer.entity';

@Entity()
export class TestPractice {
  constructor(partial?: Partial<TestPractice>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.testPractices)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column()
  time: number;

  @Column()
  LCScore: number;

  @Column()
  RCScore: number;

  @Column()
  totalQuestion: number;

  @Column()
  numCorrect: number;

  @ManyToOne(() => Test, (test) => test.testPractices)
  test: Promise<Test>;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.testPractice, {
    nullable: true,
  })
  userAnswers: Promise<UserAnswer[]>;
}

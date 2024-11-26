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
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ default: 0 })
  time: number;

  @Column({ default: 0 })
  LCScore: number;

  @Column({ default: 0 })
  RCScore: number;

  @Column({ default: 0 })
  totalQuestion: number;

  @Column({ default: 0 })
  numCorrect: number;

  @ManyToOne(() => Test, (test) => test.testPractices)
  test: Test;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.testPractice, {
    nullable: true,
  })
  userAnswers: UserAnswer[];
}

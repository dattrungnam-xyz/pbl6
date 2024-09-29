import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from '../../user-answer/entity/userAnswer.entity';

@Entity()
export class Submission {
  constructor(partial?: Partial<Submission>) {
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
  // contain list part and test
  // create new table contain list select of user
  // contain test
  // contain list part
  // contain list user answer

  @OneToMany(()=>UserAnswer, (userAnswer) => userAnswer.submission)
  userAnswer: Promise<UserAnswer[]>
}

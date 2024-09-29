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
import { User } from '../../users/entity/user.entity';

@Entity()
export class UserNewWord {
  constructor(partial?: Partial<UserNewWord>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ nullable: false })
  newWord: string;

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

  @ManyToOne(()=>User, (user)=> user.newWords)
  user: Promise<User>;
}

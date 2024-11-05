import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupQuestion } from '../../group-question/entity/groupQuestion.entity';
import { UserAnswer } from '../../user-answer/entity/userAnswer.entity';
import { QuestionMedia } from '../../question-media/entity/questionMedia.entity';
import { AnswerType } from '../../type/answer.type';

@Entity()
export class Question {
  constructor(partial?: Partial<Question>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    nullable: false,
  })
  questionNumber: number;

  @Expose()
  @Column({
    nullable: false,
  })
  question: string;

  @Expose()
  @Column("simple-array",{ nullable: true })
  answer: string[];

  @Expose()
  @Column({
    nullable: false,
  })
  correctAnswer: string;

  @Expose()
  @Column({ nullable: true })
  explain: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @ManyToOne(() => GroupQuestion, (grp) => grp.questions)
  group: Promise<GroupQuestion>;

  @Expose()
  @OneToOne(() => UserAnswer, (userAnswer) => userAnswer.question)
  userAnswer: Promise<UserAnswer>;
}

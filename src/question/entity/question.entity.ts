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
  question: string;

  @Expose()
  @Column({ nullable: true })
  optionA: string;

  @Expose()
  @Column({ nullable: true })
  optionB: string;

  @Expose()
  @Column({ nullable: true })
  optionC: string;

  @Expose()
  @Column({ nullable: true })
  optionD: string;

  @Expose()
  @Column({ nullable: false })
  answer: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @ManyToOne(() => GroupQuestion, (grp) => grp.listQuestion)
  group: Promise<GroupQuestion>;

  @Expose()
  @OneToOne(() => UserAnswer, (userAnswer) => userAnswer.question)
  userAnswer: Promise<UserAnswer>;

  @Expose()
  @OneToMany(() => QuestionMedia, (media) => media.question)
  media: Promise<QuestionMedia[]>;
}

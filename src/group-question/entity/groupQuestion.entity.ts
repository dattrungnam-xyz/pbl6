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
import { Question } from '../../question/entity/question.entity';
import { Part } from '../../part/entity/part.entity';
import { Test } from '../../test/entity/test.entity';
import { QuestionMedia } from '../../question-media/entity/questionMedia.entity';

@Entity()
export class GroupQuestion {
  constructor(partial?: Partial<GroupQuestion>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column("longtext",{ nullable: true })
  detail: string;

  @Expose()
  @Column("longtext",{ nullable: true })
  transcript: string;

  @Expose()
  @Column('simple-array', { nullable: true })
  describeAnswer: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @OneToMany(() => Question, (question) => question.group, {
    nullable: false,
    cascade: true,
  })
  questions: Question[];

  @Expose()
  @ManyToOne(() => Part, (part) => part.listGroupQuestion, { nullable: false })
  part: Part;

  @Expose()
  @ManyToOne(() => Test, (test) => test.groupQuestions, {
    nullable: false,
  })
  test: Test;

  @Expose()
  @OneToMany(
    () => QuestionMedia,
    (questionMedia) => questionMedia.groupQuestion,
    {
      nullable: true,
      cascade: true,
    },
  )
  questionMedia: QuestionMedia[];

  audio: QuestionMedia[];
  image: QuestionMedia[];
}

import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TopicQuestionType } from '../../type/topicQuestion.type';
import { WordClassType } from '../../type/wordClass.type';

@Entity()
export class TopicQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  audio: string;

  @Column()
  thumbnail: string;

  @Column({
    type: 'enum',
    enum: TopicQuestionType,
    nullable: true,
  })
  type: TopicQuestionType;

  @Column()
  describeQuestion: string;

  @Column()
  questionContent: string;

  @Column({ nullable: true })
  optionA: string;

  @Column({ nullable: true })
  optionB: string;

  @Column({ nullable: true })
  optionC: string;

  @Column({ nullable: true })
  optionD: string;

  @Column({ nullable: true })
  answer: string;

  @Column({ nullable: true })
  translate: string;

  @Column({ nullable: true })
  pronunciation: string;

  @Column({ type: 'enum', enum: WordClassType, nullable: true })
  wordClass: WordClassType;
}

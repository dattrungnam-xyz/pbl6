import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TopicQuestionType } from '../../type/topicQuestion.type';
import { WordClassType } from '../../type/wordClass.type';
import { Topic } from '../../topic/entities/topic.entity';

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
  answer: string[];

  @Column({ nullable: false })
  correctAnswer: string;

  @Column({ nullable: true })
  translate: string;

  @Column({ nullable: true })
  pronunciation: string;

  @Column({ type: 'enum', enum: WordClassType, nullable: true })
  wordClass: WordClassType;

  @Expose()
  @ManyToOne(() => Topic, (Topic) => Topic.listTopicQuestion, {
    nullable: true,
  })
  topic: Promise<Topic>;
}

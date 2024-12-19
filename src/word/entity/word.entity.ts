import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordClassType } from '../../common/type/wordClass.type';
import { Topic } from '../../topic/entity/topic.entity';
import { UserTopic } from '../../user-topic/entity/userTopic.entity';
import { TopicHistory } from '../../topic-history/entity/topicHistory.entity';

@Entity()
export class Word {
  constructor(partial?: Partial<Word>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  audio: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  word: string;

  @Column('longtext', { nullable: true })
  example: string;

  @Column('longtext', { nullable: true })
  exampleMeaning: string;

  @Column({ nullable: true })
  exampleAudio: string;

  @Column('longtext', { nullable: true })
  definition: string;

  @Column('longtext', { nullable: true })
  translate: string;

  @Column({ nullable: true })
  pronunciation: string;

  @Column('longtext', { nullable: true })
  note: string;

  @Column({ type: 'enum', enum: WordClassType, nullable: true })
  wordClass: WordClassType;

  @ManyToOne(() => Topic, (Topic) => Topic.listWord, {
    nullable: true,
  })
  topic: Topic;

  @ManyToMany(() => UserTopic, (userTopic) => userTopic.words)
  userTopic: UserTopic[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToMany(
    () => TopicHistory,
    (topicHistories) => topicHistories.correctWord,
  )
  topicHistoriesCorrect: TopicHistory[];

  @ManyToMany(
    () => TopicHistory,
    (topicHistories) => topicHistories.incorrectWord,
  )
  topicHistoriesIncorrect: TopicHistory[];
}

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
import { WordClassType } from '../../type/wordClass.type';
import { Topic } from '../../topic/entity/topic.entity';
import { UserTopic } from '../../user-topic/entity/userTopic.entity';

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

  @Column({ nullable: true })
  example: string;

  @Column({ nullable: true })
  exampleMeaning: string;

  @Column({ nullable: true })
  exampleAudio: string;

  @Column({ nullable: true })
  definition: string;

  @Column({ nullable: true })
  translate: string;

  @Column({ nullable: true })
  pronunciation: string;

  @Column({ type: 'enum', enum: WordClassType, nullable: true })
  wordClass: WordClassType;

  @ManyToOne(() => Topic, (Topic) => Topic.listWord, {
    nullable: true,
  })
  topic: Promise<Topic>;

  @ManyToMany(() => UserTopic, (userTopic) => userTopic.words)
  userTopic: Promise<UserTopic[]>;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}

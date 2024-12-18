import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Topic } from '../../topic/entity/topic.entity';
import { Word } from '../../word/entity/word.entity';

@Entity()
export class TopicHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  numCorrect: number;

  @Column({ default: 0 })
  totalWord: number;

  @Column({ default: 0 })
  time: number;

  @ManyToOne(() => User, (user) => user.topicHistories)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.topicHistories)
  topic: Topic;

  @ManyToMany(() => Word, (word) => word.topicHistoriesCorrect)
  @JoinTable()
  correctWord: Word[];

  @ManyToMany(() => Word, (word) => word.topicHistoriesIncorrect)
  @JoinTable()
  incorrectWord: Word[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}

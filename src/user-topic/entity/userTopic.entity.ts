import { Expose } from 'class-transformer';
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
import { Word } from '../../word/entity/word.entity';
import { Topic } from '../../topic/entity/topic.entity';

@Entity()
export class UserTopic {
  constructor(partial?: Partial<UserTopic>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column('longtext', { nullable: true })
  description: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.userTopic)
  user: User;

  @ManyToMany(() => Word, (word) => word.userTopic, { nullable: true })
  @JoinTable()
  words: Word[];

  @ManyToOne(() => Topic, (topic) => topic.userTopics, { nullable: true })
  topic: Topic;
}

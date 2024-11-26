import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { GroupTopic } from '../../group-topic/entity/groupTopic.entity';
import { Word } from '../../word/entity/word.entity';
import { UserTopic } from '../../user-topic/entity/userTopic.entity';
import { TopicHistory } from '../../topic-history/entity/topicHistory.entity';

@Entity()
export class Topic {
  constructor(partial?: Partial<Topic>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Expose()
  @ManyToMany(() => Tag, (tag) => tag.topic, {
    cascade: true,
    nullable: true,
  })
  tags: Tag[];

  @Expose()
  @OneToMany(() => Word, (word) => word.topic, {
    cascade: true,
    nullable: true,
  })
  listWord: Word[];

  @Expose()
  @ManyToOne(() => GroupTopic, (groupTopic) => groupTopic.topics, {
    nullable: true,
  })
  groupTopic: GroupTopic;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => UserTopic, (userTopic) => userTopic.topic, {
    nullable: true,
  })
  userTopics: UserTopic[];

  @Expose()
  @OneToMany(() => TopicHistory, (topicHistories) => topicHistories.topic)
  topicHistories: TopicHistory[];
}

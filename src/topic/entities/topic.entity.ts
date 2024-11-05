import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { TopicQuestion } from '../../topic-question/entities/topic-question.entity';
import { GroupTopic } from '../../group-topic/entity/groupTopic.entity';

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
  @OneToMany(() => Tag, (tag) => tag.topic, {
    cascade: true,
    nullable: true,
  })
  tags: Promise<Tag[]>;

  @Expose()
  @OneToMany(() => TopicQuestion, (topicQuestion) => topicQuestion.topic, {
    cascade: true,
    nullable: true,
  })
  listTopicQuestion: Promise<TopicQuestion[]>;

  @Expose()
  @ManyToOne(() => GroupTopic, (groupTopic) => groupTopic.topics, {
    nullable: true,
  })
  groupTopic: Promise<GroupTopic>;
}

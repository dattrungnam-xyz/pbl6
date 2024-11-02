import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { TopicQuestion } from '../../topic-question/entities/topic-question.entity';

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
  @OneToMany(() => Tag, (tag) => tag.test, {
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
}

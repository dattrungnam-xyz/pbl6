import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { Topic } from '../../topic/entities/topic.entity';

@Entity()
export class GroupTopic {
  constructor(partial?: Partial<GroupTopic>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  thumbnail: string;

  @Expose()
  @OneToMany(() => Tag, (tag) => tag.groupTopic, {
    cascade: true,
    nullable: true,
  })
  tags: Promise<Tag[]>;

  @Expose()
  @OneToMany(() => Topic, (topic) => topic.groupTopic, {
    cascade: true,
    nullable: true,
  })
  topics: Promise<Topic>;
}

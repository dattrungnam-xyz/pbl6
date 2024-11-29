import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from '../../test/entity/test.entity';
import { Topic } from '../../topic/entity/topic.entity';
import { GroupTopic } from '../../group-topic/entity/groupTopic.entity';
import { TagType } from '../../type/tag.type';

@Entity()
export class Tag {
  constructor(partial?: Partial<Tag>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @JoinTable()
  @ManyToMany(() => Test, (test) => test.tags, {
    nullable: true,
  })
  test: Test[];

  @Expose()
  @JoinTable()
  @ManyToMany(() => Topic, (Topic) => Topic.tags, {
    nullable: true,
  })
  topic: Topic[];

  @Expose()
  @JoinTable()
  @ManyToMany(() => GroupTopic, (GroupTopic) => GroupTopic.tags, {
    nullable: true,
  })
  groupTopic: GroupTopic[];

  @Expose()
  @Column({
    type: 'enum',
    enum: TagType,
    default: TagType.FREE,
  })
  type: TagType;
}

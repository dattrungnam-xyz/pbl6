import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { GroupTopic } from '../../group-topic/entity/groupTopic.entity';
import { Word } from '../../word/entity/word.entity';

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
  @OneToMany(() => Word, (word) => word.topic, {
    cascade: true,
    nullable: true,
  })
  listWord: Promise<Word[]>;

  @Expose()
  @ManyToOne(() => GroupTopic, (groupTopic) => groupTopic.topics, {
    nullable: true,
  })
  groupTopic: Promise<GroupTopic>;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}

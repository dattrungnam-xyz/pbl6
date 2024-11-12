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
import { Topic } from '../../topic/entity/topic.entity';
import { Level } from '../../type/level.type';

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
  @Column({
    type: 'enum',
    enum: Level,
    default: Level.BEGINNER,
  })
  level: Level;

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
  
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
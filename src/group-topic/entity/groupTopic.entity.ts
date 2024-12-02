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
import { Topic } from '../../topic/entity/topic.entity';
import { Level } from '../../type/level.type';
import { Comment } from '../../comment/entity/comment.entity';
import { Rating } from '../../rating/entity/rating.entity';

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
  target: string;

  @Expose()
  @Column()
  description: string;

  @Expose()
  @Column()
  thumbnail: string;

  @Expose()
  @ManyToMany(() => Tag, (tag) => tag.groupTopic, {
    cascade: true,
    nullable: true,
  })
  tags: Tag[];

  @Expose()
  @OneToMany(() => Topic, (topic) => topic.groupTopic, {
    cascade: true,
    nullable: true,
  })
  topics: Topic[];

  @Expose()
  @OneToMany(() => Comment, (comment) => comment.groupTopic, {
    nullable: true,
  })
  comments: Comment[];

  @Expose()
  @OneToMany(() => Rating, (rating) => rating.groupTopic, { nullable: true })
  ratings: Rating[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}

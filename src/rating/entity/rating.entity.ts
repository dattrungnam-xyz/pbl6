import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { GroupTopic } from '../../group-topic/entity/groupTopic.entity';

@Entity()
export class Rating {
  constructor(partial?: Partial<Rating>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column("longtext")
  ratingContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.ratings, {
    nullable: true,
  })
  user: User;

  @ManyToOne(() => GroupTopic, (groupTopic) => groupTopic.ratings, {
    nullable: true,
  })
  groupTopic: GroupTopic;
}

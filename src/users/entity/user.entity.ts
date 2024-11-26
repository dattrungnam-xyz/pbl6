import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../type/role.type';
import { UserTopic } from '../../user-topic/entity/userTopic.entity';
import { TestPractice } from '../../test-practice/entity/testPractice.entity';
import { FlashCard } from '../../flash-card/entity/flashCard.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { TopicHistory } from '../../topic-history/entity/topicHistory.entity';

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ nullable: true })
  username: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column({ nullable: true })
  avatar: string;

  @Expose()
  @Column({ nullable: true, length: 11 })
  phone: string;

  @Expose()
  @Column({ nullable: true })
  targetScore: number;

  @Expose()
  @Column({ nullable: true })
  testDate: Date;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  passwordResetToken: String;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column('simple-array')
  roles: Role[];

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @OneToMany(() => UserTopic, (userTopic) => userTopic.user)
  userTopic: UserTopic[];

  @Expose()
  @OneToMany(() => FlashCard, (flashCard) => flashCard.user)
  flashCard: FlashCard[];

  @Expose()
  @OneToMany(() => TestPractice, (testPractice) => testPractice.user)
  testPractices: TestPractice[];

  @Expose()
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Expose()
  @OneToMany(() => TopicHistory, (topicHistories) => topicHistories.user)
  topicHistories: TopicHistory[];
}

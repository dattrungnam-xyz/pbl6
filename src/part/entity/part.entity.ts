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
import { GroupQuestion } from '../../group-question/entity/groupQuestion.entity';
import { Test } from '../../test/entity/test.entity';
import { EngLishTest } from '../../english-test/entity/englishTest.entity';

@Entity()
export class Part {
  constructor(partial?: Partial<Part>) {
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
  totalQuestion: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @OneToMany(() => GroupQuestion, (grp) => grp.part)
  listGroupQuestion: Promise<GroupQuestion[]>;

  @Expose()
  @ManyToOne(() => EngLishTest, (test) => test.part, { cascade: true })
  test: Promise<EngLishTest>;
}

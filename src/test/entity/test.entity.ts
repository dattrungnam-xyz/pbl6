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
import { EngLishTest } from '../../english-test/entity/englishTest.entity';
import { GroupQuestion } from '../../group-question/entity/groupQuestion.entity';

@Entity()
export class Test {
  constructor(partial?: Partial<Test>) {
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
  time: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @ManyToOne(() => EngLishTest, (englishTest) => englishTest.listTest)
  typeTest: Promise<EngLishTest>;

  @Expose()
  @OneToMany(()=> GroupQuestion, (group)=>group.test)
  groupQuestion: Promise<GroupQuestion[]>;

}

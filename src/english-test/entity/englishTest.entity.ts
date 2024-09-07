import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from '../../test/entity/test.entity';
import { Part } from '../../part/entity/part.entity';
import { EngLishTestType } from '../../type/englishTest.type';

@Entity()
export class EngLishTest {
  constructor(partial?: Partial<EngLishTest>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: EngLishTestType,
    default: EngLishTestType.TOEIC,
  })
  type: EngLishTestType;

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
  @OneToMany(() => Test, (test) => test.typeTest)
  listTest: Promise<Test[]>;

  @Expose()
  @OneToMany(() => Part, (part) => part.test)
  part: Promise<Part[]>;
}

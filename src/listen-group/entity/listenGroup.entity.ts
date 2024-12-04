import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListenLession } from '../../listen-lession/entity/listenLession.entity';
import { Level } from '../../type/level.type';

@Entity()
export class ListenGroup {
  constructor(partial: Partial<ListenGroup>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Level,
    default: Level.BEGINNER,
  })
  level: Level;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => ListenLession, (listenLession) => listenLession.listenGroup)
  listenLessions: ListenLession[];
}

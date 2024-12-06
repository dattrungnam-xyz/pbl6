import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListenLesson } from '../../listen-lesson/entity/listenLesson.entity';
import { Level } from '../../common/type/level.type';
import { Paginated } from '../../pagination/paginator';

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

  @OneToMany(() => ListenLesson, (listenLesson) => listenLesson.listenGroup)
  listenLessons: ListenLesson[];
}

export class PaginatedListenGroup extends Paginated<ListenGroup>(ListenGroup) {}

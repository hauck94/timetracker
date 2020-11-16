import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Task } from "./task";

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
/*
  @Column({
    default: 'today',
})
  startTime: string;

  @Column({
    default: 'tomorrow',
})
  endTime: string;
*/
  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updatedAt: string;

  // Ein Tracking gehört immer zu einem Task. Ein Task kann 0 oder N Trackings haben.
  @ManyToOne(() => Task, (task) => task.trackings, {
    nullable : false,
    onDelete: "CASCADE",
  })
  task: Task;  
}

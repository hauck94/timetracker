import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Task } from "./task";

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  startTime: string;

  @Column({ type: "timestamp", precision: 6, nullable: true })
  endTime: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updatedAt: string;

  // delete cascade, da tracking nicht ohne Task existieren kann und somit mit gelöscht werden soll
  @ManyToOne(() => Task, (task) => task.trackings, {
    nullable: false,
    onDelete: "CASCADE",
  })
  task: Task;
}

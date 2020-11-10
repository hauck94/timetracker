import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from "typeorm";
import { Task } from "./task";

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Task, (task) => task.labels, { nullable: true })
  tasks: Task[];
}

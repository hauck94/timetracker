import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
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
  @JoinTable() // owner side of the relationship.
  tasks: Task[];
}

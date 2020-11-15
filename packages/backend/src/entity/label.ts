import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { Task } from './task';

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

  // Ein Label kann 0 oder N Tasks haben und ein Task kann 0 oder N Labels haben
  @ManyToMany(() => Task, {nullable : true})
    tasks: Task[];
}

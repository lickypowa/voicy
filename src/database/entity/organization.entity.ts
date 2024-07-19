import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../shared/abstract.entity';
import { User } from './user.entity';

@Entity({ name: 'organization' })
export class Organization extends Base {
  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Base } from '../shared/abstract.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'user' })
export class User extends Base {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;

  @DeleteDateColumn({ name: 'delete_date', nullable: true })
  deleteDate!: Date;
}

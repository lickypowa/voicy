import { Column, DeleteDateColumn, Entity, OneToOne } from 'typeorm';
import { Base } from '../shared/abstract.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'user' })
export class User extends Base {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Organization, { nullable: true })
  organization?: Organization;

  @DeleteDateColumn({ name: 'delete_date', nullable: true })
  deleteDate!: Date;
}

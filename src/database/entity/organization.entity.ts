import { Column, Entity } from 'typeorm';
import { Base } from '../shared/abstract.entity';

@Entity()
export class Organization extends Base {
  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  email?: string;
}

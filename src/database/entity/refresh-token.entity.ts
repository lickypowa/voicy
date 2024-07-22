import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh_token' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  token!: string;

  @Column()
  userId!: string;

  @Column()
  expiryDate!: Date;
}

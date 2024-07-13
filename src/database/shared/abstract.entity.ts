import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  set<K extends keyof this>(key: K, value: this[K] | undefined): this {
    if (value !== undefined) {
      this[key] = value;
    }
    return this;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'created_date' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedAt!: Date;
}

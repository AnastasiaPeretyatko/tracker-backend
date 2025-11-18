import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Удобный метод для проверки пароля (instance method)
  async validatePassword(plainPassword: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await bcrypt.compare(plainPassword, this.password);
  }
}

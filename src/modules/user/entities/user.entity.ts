import { Role } from '@src/common/enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  citizenId: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  provinceId: number;

  @Column()
  districtId: number;

  @Column()
  wardId: number;

  @Column({ type: String, default: '' })
  resetPasswordToken: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}

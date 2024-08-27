import { District } from '@modules/import-excel/entities/district.entity';
import { Province } from '@modules/import-excel/entities/province.entity';
import { Ward } from '@modules/import-excel/entities/ward.entity';
import { VaccineRegistration } from '@modules/vaccine-registrations/entities/vaccine-registration.entity';
import { Role } from '@src/common/enum/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

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

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.user,
  )
  vaccineRegistrations: VaccineRegistration[];

  @ManyToOne(() => Province, (province) => province.users)
  province: Province;

  @ManyToOne(() => District, (district) => district.users)
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.users)
  ward: Ward;
}

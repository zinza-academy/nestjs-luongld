import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Province } from './province.entity';
import { District } from './district.entity';
import { VaccinationSite } from '@modules/vaccination-sites/entities/vaccination-site.entity';
import { User } from '@modules/users/entities/user.entity';

@Entity()
export class Ward {
  @PrimaryColumn()
  id: number;

  @Column()
  ward: string;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;

  @ManyToOne(() => Province, (province) => province.wards)
  province: Province;

  @OneToMany(() => VaccinationSite, (vaccineSites) => vaccineSites.ward)
  vaccineSites: VaccinationSite[];

  @OneToMany(() => User, (user) => user.ward)
  users: User[];
}

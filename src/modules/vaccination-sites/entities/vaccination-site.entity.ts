import { District } from '@modules/import-excel/entities/district.entity';
import { Province } from '@modules/import-excel/entities/province.entity';
import { Ward } from '@modules/import-excel/entities/ward.entity';
import { VaccineResult } from '@modules/vaccine-result/entities/vaccine-result.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VaccinationSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vaccinationSiteName: string;

  @Column()
  address: string;

  @Column()
  provinceId: number;

  @Column()
  districtId: number;

  @Column()
  wardId: number;

  @Column()
  vaccinationSiteLeader: string;

  @Column()
  quantityTable: number;

  @ManyToOne(() => Province, (province) => province.vaccineSites)
  province: Province;

  @ManyToOne(() => District, (district) => district.vaccineSites)
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.vaccineSites)
  ward: Ward;

  @OneToMany(
    () => VaccineResult,
    (vaccineResult) => vaccineResult.vaccinationSite,
  )
  vaccineResults: VaccineResult[];
}

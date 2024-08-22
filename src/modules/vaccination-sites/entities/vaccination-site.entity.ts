import { District } from '@modules/import-excel/entities/district.entity';
import { Province } from '@modules/import-excel/entities/province.entity';
import { Ward } from '@modules/import-excel/entities/ward.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VaccinationSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vaccinationSiteName: string;

  @Column()
  address: string;

  @Column()
  provinceId: string;

  @Column()
  districtId: string;

  @Column()
  wardId: string;

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
}

import { Command, CommandRunner } from 'nest-commander';
import * as ExcelJS from 'exceljs';
import { ImportExcelService } from '../import-excel.service';
import * as path from 'path';
import * as fs from 'fs';

@Command({
  name: 'import:excel',
  description: 'Import data from Excel file province',
})
export class ImportExcelCommand extends CommandRunner {
  constructor(private readonly importExcelService: ImportExcelService) {
    super();
  }
  async run(): Promise<void> {
    const provinceFilePath = path.join(
      process.cwd(),
      'uploads/excel/province.xlsx',
    );
    const districtFilePath = path.join(
      process.cwd(),
      'uploads/excel/district.xlsx',
    );
    const wardFilePath = path.join(process.cwd(), 'uploads/excel/ward.xlsx');

    if (
      !fs.existsSync(provinceFilePath) ||
      !fs.existsSync(districtFilePath) ||
      !fs.existsSync(wardFilePath)
    ) {
      console.log('Không tồn tại đường dẫn file');
    }

    const workbook = new ExcelJS.Workbook();

    const provinces = [];
    const districts = [];
    const wards = [];

    //Đọc file dữ liệu tỉnh
    await workbook.xlsx.readFile(provinceFilePath);
    let worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1 || rowNumber === worksheet.rowCount) {
        return;
      }
      const rowData = {
        id: +row.getCell(1).value,
        province: row.getCell(2).value,
      };
      provinces.push(rowData);
    });

    //Đọc file dữ liệu huyện
    await workbook.xlsx.readFile(districtFilePath);
    worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1 || rowNumber === worksheet.rowCount) {
        return;
      }
      const rowData = {
        id: +row.getCell(1).value,
        district: row.getCell(2).value,
        provinceId: +row.getCell(5).value,
      };
      districts.push(rowData);
    });

    //Đọc file dữ liệu xã
    await workbook.xlsx.readFile(wardFilePath);
    worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1 || rowNumber === worksheet.rowCount) {
        return;
      }
      const rowData = {
        id: +row.getCell(1).value,
        ward: row.getCell(2).value,
        districtId: +row.getCell(5).value,
        provinceId: +row.getCell(7).value,
      };
      wards.push(rowData);
    });

    await this.importExcelService.importProvince(provinces);
    await this.importExcelService.importDistrict(districts);
    await this.importExcelService.importWard(wards);
  }
}

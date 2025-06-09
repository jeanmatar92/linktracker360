import { Injectable } from '@angular/core';
import { VerticalCellAlignment, Workbook, WorkbookFormat, Worksheet } from 'igniteui-angular-excel';
import { UrlLandingPageCouple } from './url-landing-page-couple';
import { MatSnackBar } from '@angular/material/snack-bar';
import { last } from 'rxjs';

interface Cm360ValidationResponse {
  valid: boolean;
  clickTagsColumnIndex: number;
  headersRowIndex: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetToolsService {

  constructor(private _snackBar: MatSnackBar) { }

  createExportFile(tableElements: UrlLandingPageCouple[]): Workbook {
    let wb: Workbook = new Workbook(WorkbookFormat.Excel2007);
    let ws: Worksheet = wb.worksheets().add("Sheet1");

    // Setting the headers
    ws.rows(0).cells(0).value = 'Initial URL';
    ws.rows(0).cells(1).value = 'Landing Page';

    // Adding the url couples
    let index: number = 1;
    for (let item of tableElements) {
      ws.rows(index).cells(0).value = item.initialUrl;
      ws.rows(index).cells(1).value = item.finalLandingPage;
      index++;
    }

    return wb;
  }

  createBlankTemplate() {
    let wb: Workbook = new Workbook(WorkbookFormat.Excel2007);
    let ws: Worksheet = wb.worksheets().add("Sheet1");

    // Setting the headers
    ws.rows(0).cells(0).value = 'Initial URL';

    // Adding some examples
    ws.rows(1).cells(0).value = 'https://www.example1.com';
    ws.rows(2).cells(0).value = 'https://www.example2.com';

    return wb;
  }

  loadBulkTemplate(wb: Workbook): string[] {
    let worksheetsArray = [...wb.worksheets()];
    let worksheetnamesArray = worksheetsArray.map(sheet => sheet.name);

    if (!worksheetnamesArray.includes('Sheet1') || wb.worksheets('Sheet1').rows(0).cells(0).value != 'Initial URL') {
      let errorMessage = "This file doesn't follow the correct template.";
      let action = 'Close';
      this._snackBar.open(errorMessage, action, {
        duration: 5000
      });
      return [];
    }

    let ws = wb.worksheets('Sheet1');

    let lastRowIndex = this.getLastRowIndex(ws);
    if (lastRowIndex == 0) {
      let errorMessage = "This template doesn't contain any URL";
      let action = 'Close';
      this._snackBar.open(errorMessage, action, {
        duration: 5000
      });
      return [];
    }

    let outputList: string[] = [];
    for (let i = 1; i <= lastRowIndex; i++) {
      if (!ws.rows(i).cells(0).value) {
        continue;
      } else {
        outputList.push(ws.rows(i).cells(0).value);
      }
      
    }

    return outputList;
    
  }

  getLastRowIndex(ws: Worksheet): number {
    let totalRows = ws.rows().maxCount;
    let lastIndex: number = 0;

    for (let i = totalRows - 1; i >= 0; i--) {
      if (ws.rows(i).cells().count == 0) {
        continue;
      } else {
        lastIndex = i;
        break;
      }
    }

    // Returning the last index which is equal to the last row number -1
    return lastIndex;
  }

  getLastColumnIndex(ws: Worksheet, rowIndex: number): number {
    let totalColumns = ws.rows(rowIndex).cells().maxCount;
    let lastindex: number = 0;

    for (let i = totalColumns - 1; i >= 0; i--) {
      if (!ws.rows(rowIndex).cells(i).value) {
        continue;
      } else {
        lastindex = i;
        break;
      }
    }

    return lastindex;
  }

  fileExtensionValid(file: File): boolean {
    let extension = file.name.split('.').pop();
    if (extension && ['xls', 'xlsx', 'xlsm'].includes(extension)) {
      return true;
    } else {
      let errorMessage = 'File type not supported. Supported extensions are ".xls", ".xlsx", and ".xlsm"';
      let action = 'Close';
      this._snackBar.open(errorMessage, action, {
        duration: 7000
      });
      return false;
    }
  }

  verifyCm360Template(wb: Workbook): Cm360ValidationResponse {
    let validationObject: Cm360ValidationResponse = {
      valid: false,
      clickTagsColumnIndex: 0,
      headersRowIndex: 0,
      message: ''
    };

    let worksheetsArray = [...wb.worksheets()];
    let worksheetnamesArray = worksheetsArray.map(sheet => sheet.name);
    if (!worksheetnamesArray.includes('Tracking Ads')) {
      validationObject.message = `This file doesn't contain any sheet named "Tracking Ads"`;
      this._snackBar.open(validationObject.message, 'Close', {
        duration: 5000
      });
      return validationObject;
    }

    let ws = wb.worksheets('Tracking Ads');
    let lastRowIndex = this.getLastRowIndex(ws);
    let lastColumnIndexToTry = ws.rows(lastRowIndex).cells().count + 30;

    for (let rowIndex = 0; rowIndex <= lastRowIndex; rowIndex++) {
      if (ws.rows(rowIndex)) {
        for (let colIndex = 0; colIndex <= lastColumnIndexToTry; colIndex++) {
          let cell = ws.rows(rowIndex).cells(colIndex);
          if (cell && cell.value == 'Click Tag') {
            validationObject.valid = true;
            validationObject. message = 'Template is valid';
            validationObject.clickTagsColumnIndex = colIndex;
            validationObject.headersRowIndex = rowIndex;
            return validationObject;
          }
        }
      }
    }

    validationObject.message = 'This is not a CM360 template';
    this._snackBar.open(validationObject.message, 'Close', {
      duration: 5000
    });
    return validationObject;

  }

  readCm360Template(wb: Workbook, clickTagsColumnIndex: number, headersRowIndex: number): string[] {
    let ws = wb.worksheets('tracking Ads');
    let lastRowIndex = this.getLastRowIndex(ws);

    let listOfUrls: string[] = [];

    for (let i = headersRowIndex + 1; i <= lastRowIndex; i++) {
      listOfUrls.push(ws.rows(i).cells(clickTagsColumnIndex).value);
    }

    return listOfUrls;
  }

  createUpdatedCm360Template(wb: Workbook, listOfLandingPages: string[], headersRowIndex: number): Workbook {
    let ws = wb.worksheets('Tracking Ads');
    let landingPagesColumnIndex = this.getLastColumnIndex(ws, headersRowIndex) + 1;
    ws.rows(headersRowIndex).cells(landingPagesColumnIndex).value = 'Landing Page - Added by LinkTracker360 (linktracker360.com)';
    let rowIndex = headersRowIndex + 1;
    for (let landingPage of listOfLandingPages) {
      ws.rows(rowIndex).cells(landingPagesColumnIndex).value = landingPage;
      let lpCellFormat = ws.rows(rowIndex).cells(landingPagesColumnIndex - 1).cellFormat;
      ws.rows(rowIndex).cells(landingPagesColumnIndex).cellFormat.setFormatting(lpCellFormat);
      rowIndex++;
    }

    let headerFormat = ws.rows(headersRowIndex).cells(landingPagesColumnIndex - 1).cellFormat;
    ws.rows(headersRowIndex).cells(landingPagesColumnIndex).cellFormat.setFormatting(headerFormat);
    ws.columns(landingPagesColumnIndex).width = 15360;

    return wb;
  }

}

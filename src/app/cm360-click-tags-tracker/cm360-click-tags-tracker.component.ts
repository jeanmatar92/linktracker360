import { Component, Input } from '@angular/core';
import { SpreadsheetToolsService } from '../spreadsheet-tools.service';
import { ExcelUtility } from '../excel-utility';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlFetchService } from '../url-fetch.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-cm360-click-tags-tracker',
  templateUrl: './cm360-click-tags-tracker.component.html',
  styleUrls: ['./cm360-click-tags-tracker.component.scss']
})
export class Cm360ClickTagsTrackerComponent {

  isMobile: boolean = false;
  isTablet: boolean = false;

  selectedFile: File | null = null;

  listOfInitialUrls: string[] = [];
  listOfLandingPages: string[] = [];

  clickTagsColumnIndex: number | undefined;
  headersRowIndex: number | undefined;

  isError: boolean = false;
  parsing: boolean = false;
  ended: boolean = false;
  loadingFile: boolean = false;

  constructor(private urlFetch: UrlFetchService,
    private spreadsheetTools: SpreadsheetToolsService,
    private _snackBar: MatSnackBar,
    private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }
    
  filesDropped(event: any) {
    if (this.spreadsheetTools.fileExtensionValid(event)) {
      this.selectedFile = event;
    }
    console.log (this.selectedFile);
    this.uploadFile();
  }

  onFileSelected(event: any) {
    if (this.spreadsheetTools.fileExtensionValid(event.target.files[0])) {
      this.selectedFile = event.target.files[0];
    }
    console.log (this.selectedFile);
    this.uploadFile();
  }

  clear() {
    this.selectedFile = null;
    this.listOfInitialUrls.splice(0, this.listOfInitialUrls.length);
  }

  uploadFile() {
    if (!this.selectedFile) {
      return;
    }

    this.loadingFile = true;

    ExcelUtility.load(this.selectedFile).then((wb) => {
      let validationResponse = this.spreadsheetTools.verifyCm360Template(wb);
      console.log(validationResponse);
      if (!validationResponse.valid) {
        this.selectedFile = null;
        this.loadingFile = false;
        return;
      } else {
        this.clickTagsColumnIndex = validationResponse.clickTagsColumnIndex;
        this.headersRowIndex = validationResponse.headersRowIndex;
        this.listOfInitialUrls = [...this.spreadsheetTools.readCm360Template(wb, this.clickTagsColumnIndex!, this.headersRowIndex!)];
        this.loadingFile = false;
        console.log(this.listOfInitialUrls);
      }
    }, (e) => {
      console.log('Workbook not loaded');
    });
  }

  getLandingPages() {
    try {
      this.isError = false;
      this.parsing = true;
      this.ended = false;
      this.urlFetch.getLandingPagesFromJson(this.listOfInitialUrls).subscribe(response => {
        for (let item of (response as any)) {
          this.listOfLandingPages.push(item['landingPage']);
        }

        console.log(this.listOfLandingPages);

        this.parsing = false;
        this.ended = true;
      });
    } catch (error) {
      this.handleError();
    }
  }

  downloadUpdatedTemplate() {
    if (!this.selectedFile) {
      return;
    }

    ExcelUtility.load(this.selectedFile).then((wb) => {
      let updatedTemplate = this.spreadsheetTools.createUpdatedCm360Template(wb, this.listOfLandingPages, this.headersRowIndex!);
      let fileNameWithoutExtension = '[With LP] ' + this.selectedFile!.name.split('.')[0];
      ExcelUtility.save(updatedTemplate, fileNameWithoutExtension);
    }, (e) => {
      console.log('Workbook not loaded');
    });
  }

  handleError() {
    this.isError = true;
    this.parsing = false;
    this.ended = true;

    let snackBarMessage: string = 'An error occurred. Please check your URL and try again.';
    let snackBarAction: string = 'Close';
    this._snackBar.open(snackBarMessage, snackBarAction, {
      duration: 5000,
    });
  }

}

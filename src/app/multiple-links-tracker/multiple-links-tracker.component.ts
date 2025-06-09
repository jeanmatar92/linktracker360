import { Component, Input } from '@angular/core';
import { UrlLandingPageCouple } from "../url-landing-page-couple";
import { UrlFetchService } from '../url-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpreadsheetToolsService } from '../spreadsheet-tools.service';
import { ExcelUtility } from '../excel-utility';
import { trigger, transition, style, animate } from "@angular/animations";
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-multiple-links-tracker',
  templateUrl: './multiple-links-tracker.component.html',
  styleUrls: ['./multiple-links-tracker.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class MultipleLinksTrackerComponent {

  isMobile: boolean = false;
  isTablet: boolean = false;
  
  appLockedForAddingUrl: boolean = false;
  addButtonDisabled: boolean = false;
  removeButtonDisabled: boolean = false;
  getLandingPagesButtonDisabled: boolean = false;
  isError: boolean = false;
  parsing: boolean = false;
  ended: boolean = false;
  showUploadDialog: boolean = false;

  userUrl: string = '';

  tableElements: UrlLandingPageCouple[] = [];
  listOfUrls: string[] = [];

  constructor(private urlFetch: UrlFetchService,
    private _snackBar: MatSnackBar,
    private spreadsheetTools: SpreadsheetToolsService,
    private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }

  btnHelp() {
    window.open('#/multipletrackerhelp', '_blank');
  }

  addUrl(url: string) {
    if (this.appLockedForAddingUrl) {
      return;
    }
    if (url.length == 0) {
      return;
    }
    this.listOfUrls.push(url);
  }

  removeUrl(index: number) {
    this.listOfUrls.splice(index, 1);
  }

  getLandingPages(listOfUrls: string[]) {
    try {
      this.appLockedForAddingUrl = true;
      this.addButtonDisabled = true;
      this.removeButtonDisabled = true;
      this.getLandingPagesButtonDisabled = true;

      this.isError = false;
      this.parsing = true;
      this.ended = false;

      this.urlFetch.getLandingPagesFromJson(listOfUrls).subscribe(response => {
        for (let item of (response as any)) {
          let couple: UrlLandingPageCouple = {
            initialUrl: '',
            finalLandingPage: ''
          };
          couple.initialUrl = item['url'];
          couple.finalLandingPage = item['landingPage'];
          this.tableElements.push(couple);
        }

        listOfUrls.splice(0, listOfUrls.length);
        this.parsing = false;
        this.ended = true;
      });

    } catch (error) {
      this.handleError();
    }
  }

  handleError() {
    this.isError = true;
    this.tableElements.splice(0, this.tableElements.length);
    this.appLockedForAddingUrl = false;
    this.addButtonDisabled = false;
    this.removeButtonDisabled = false;
    this.getLandingPagesButtonDisabled = false;

    let snackBarMessage: string = 'An error occurred. Please check your URLs and try again.';
    let snackBarAction: string = 'Close';
    this._snackBar.open(snackBarMessage, snackBarAction, {
      duration: 5000,
    });
  }

  exportResults(tableElements: UrlLandingPageCouple[]) {
    let wb = this.spreadsheetTools.createExportFile(tableElements);

    ExcelUtility.save(wb, "Table Export").then((f) => {
      console.log("Saved: " + f);
    }, (e) => {
      console.log("ExcelUtility.Save Error: " + e);
    });
  }

  downloadTemplate() {
    let wb = this.spreadsheetTools.createBlankTemplate();

    ExcelUtility.save(wb, "Bulk Template").then((f) => {
      console.log("Saved: " + f);
    }, (e) => {
      console.log("ExcelUtility.Save Error: " + e);
    });
  }

  handleUpload(event: any) {
    let file = event.file;

    ExcelUtility.load(file).then((wb) => {
      this.listOfUrls = [...this.spreadsheetTools.loadBulkTemplate(wb)!];
      this.showUploadDialog = false;
    }, (e) => {
      console.log('An error occurred. Workbook was not loaded.');
    });
  }
}

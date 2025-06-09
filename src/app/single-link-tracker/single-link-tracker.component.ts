import { Component, OnInit } from '@angular/core';
import { UrlFetchService } from '../url-fetch.service';
import { ResponseData } from "../response-data";
import { statusCodesMap } from '../status-codes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-single-link-tracker',
  templateUrl: './single-link-tracker.component.html',
  styleUrls: ['./single-link-tracker.component.scss']
})
export class SingleLinkTrackerComponent implements OnInit {

  isMobile: boolean = false;
  isTablet: boolean = false;

  userUrl: string | undefined;
  initialUrl: string = '';

  redirectionData: ResponseData[] = [];

  lastStatusCodeNumber: number = 0;
  lastStatusCodeName: string = '';

  parsing: boolean = false;
  ended: boolean = false;
  isError: boolean = false;

  constructor(private urlFetch: UrlFetchService,
    private _snackBar: MatSnackBar,
    private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  } 

  getRedirections(url: string) {
    if (!this.userUrl) {
      return;
    }

    try {
      this.isError = false;
      this.parsing = true;
      this.ended = false;

      if (this.redirectionData && this.redirectionData.length > 0) {
        this.redirectionData.splice(0, this.redirectionData.length);
      }

      this.initialUrl = url;

      this.urlFetch.getRedirectionsFromJson(url).subscribe((response) => {
        if (response == null) {
          this.handleError();
          return;
        }
        this.redirectionData = [...(response as ResponseData[])];

        for (let item of this.redirectionData!) {
          item.statusCodeName = statusCodesMap.get(item.statusCodeNumber)!;
        }
    
        this.lastStatusCodeNumber = this.redirectionData[this.redirectionData.length - 1].statusCodeNumber;
        this.lastStatusCodeName = statusCodesMap.get(this.lastStatusCodeNumber)!;
    
        // Removing the last item after reading its status code so it doesn't appear in the final array
        this.redirectionData?.splice(this.redirectionData.length - 1, 1);
        
        this.parsing = false;
        this.ended = true;
      });
    } catch (error) {
      this.handleError();
    }
    
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

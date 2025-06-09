import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SingleLinkTrackerComponent } from './single-link-tracker/single-link-tracker.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UrlFetchService } from './url-fetch.service';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { RedirectionCardComponent } from './redirection-card/redirection-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AboutComponent } from './about/about.component';
import { StatusCodesComponent } from './status-codes/status-codes.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MultipleLinksTrackerComponent } from './multiple-links-tracker/multiple-links-tracker.component';
import { IgxExcelModule } from 'igniteui-angular-excel';
import { SpreadsheetToolsService } from './spreadsheet-tools.service';
import { BulkUploadDialogComponent } from './bulk-upload-dialog/bulk-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppDragDirective } from './app-drag.directive';
import { Cm360ClickTagsTrackerComponent } from './cm360-click-tags-tracker/cm360-click-tags-tracker.component';
import { HelpMultipleTrackerComponent } from './help-multiple-tracker/help-multiple-tracker.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SingleLinkTrackerComponent,
    HomePageComponent,
    RedirectionCardComponent,
    AboutComponent,
    StatusCodesComponent,
    MultipleLinksTrackerComponent,
    BulkUploadDialogComponent,
    AppDragDirective,
    Cm360ClickTagsTrackerComponent,
    HelpMultipleTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    IgxExcelModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-9589898753512701'
    })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UrlFetchService,
    SpreadsheetToolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

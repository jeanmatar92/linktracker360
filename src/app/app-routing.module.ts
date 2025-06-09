import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleLinkTrackerComponent } from './single-link-tracker/single-link-tracker.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { StatusCodesComponent } from './status-codes/status-codes.component';
import { MultipleLinksTrackerComponent } from './multiple-links-tracker/multiple-links-tracker.component';
import { Cm360ClickTagsTrackerComponent } from './cm360-click-tags-tracker/cm360-click-tags-tracker.component';
import { HelpMultipleTrackerComponent } from './help-multiple-tracker/help-multiple-tracker.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'LinkTracker360 - Your links from A to Z' },
  { path: 'singlelinktracker', component: SingleLinkTrackerComponent, title: 'Single Link Tracker - LinkTracker360' },
  { path: 'multiplelinkstracker', component: MultipleLinksTrackerComponent, title: 'Multiple Links Tracker - LinkTracker360' },
  { path: 'cm360clicktags', component: Cm360ClickTagsTrackerComponent, title: 'CM360 Click Tags Tracker - LinkTracker360' },
  { path: 'statuscodes', component: StatusCodesComponent, title: 'Status Codes - LinkTracker360' },
  { path: 'about', component: AboutComponent, title: 'About - LinkTracker360' },
  { path: 'multipletrackerhelp', component: HelpMultipleTrackerComponent, title: 'Instructions for Multiple Links Tracker tool - LinkTracker360' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

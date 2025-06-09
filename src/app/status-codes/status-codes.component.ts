import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-status-codes',
  templateUrl: './status-codes.component.html',
  styleUrls: ['./status-codes.component.scss']
})
export class StatusCodesComponent implements OnInit {

  isMobile: boolean = false;
  isTablet: boolean = false;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }

}

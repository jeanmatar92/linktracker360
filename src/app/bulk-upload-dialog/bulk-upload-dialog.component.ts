import { Component, EventEmitter, Output } from '@angular/core';
import { SpreadsheetToolsService } from '../spreadsheet-tools.service';

@Component({
  selector: 'app-bulk-upload-dialog',
  templateUrl: './bulk-upload-dialog.component.html',
  styleUrls: ['./bulk-upload-dialog.component.scss']
})
export class BulkUploadDialogComponent {

  selectedFile: File | null = null;
  loadingFile: boolean = false;

  @Output('onCancel') onCancel = new EventEmitter();
  @Output('onUpload') onUpload = new EventEmitter();

  constructor(private spreadsheetTools: SpreadsheetToolsService) {}

  filesDropped(event: any) {
    if (this.spreadsheetTools.fileExtensionValid(event)) {
      this.selectedFile = event;
    }
  }

  onFileSelected(event: any) {
    if (this.spreadsheetTools.fileExtensionValid(event.target.files[0])) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      return;
    }
    this.onUpload.emit({file: this.selectedFile});
    this.loadingFile = true;
  }
}

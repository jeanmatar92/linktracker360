import { Directive, HostBinding, HostListener, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// export interface FileHandle {
//   file: File,
//   url: SafeUrl
// }

@Directive({
  selector: '[appDrag]'
})
export class AppDragDirective {

  @Output() files: EventEmitter<File> = new EventEmitter();

  @HostBinding("style.background") private background = "white";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#B3E5FC";
    
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "white";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'white';
  
    // let files: FileHandle[] = [];
    // for (let i = 0; i < evt.dataTransfer!.files.length; i++) {
    //   const file = evt.dataTransfer!.files[i];
    //   const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    //   files.push({ file, url });
    // }
    // if (files.length > 0) {
    //   this.files.emit(files);
    // }

    let file: File = evt.dataTransfer!.files[0];
    if (file) {
      this.files.emit(file);
    }

  }

}

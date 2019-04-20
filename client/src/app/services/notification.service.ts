import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastrService: ToastrService, private zone: NgZone) { }

  showError(msg: string): void {
    this.zone.run(() => { this.toastrService.error(msg); });
  }

  showSuccess(msg: string): void {
    this.zone.run(() => { this.toastrService.success(msg); });
  }

  showWarning(msg: string): void {
    this.zone.run(() => { this.toastrService.warning(msg); });
  }

  showInfo(msg: string): void {
    this.zone.run(() => { this.toastrService.info(msg); });
  }
}

import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './../services/error.service';
import { NotificationService } from './../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(err: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);

        let msg;

        if (err instanceof HttpErrorResponse) {
            // Server error
            msg = errorService.getServerMessage(err);
        } else {
            // Client error
            msg = errorService.getClientMessage(err);
        }

        notifier.showError(msg);
        console.error(err);
    }
}

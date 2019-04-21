import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotifMsgs } from './../constants/notification-messages';
import { Constants } from './../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  
  getClientMessage(err: Error): string {
    if (!navigator.onLine) {
      return NotifMsgs.serverErrors.NO_INTERNET_CONNECTION;
    }

    return err.message ? err.message : err.toString();
  }

  getServerMessage(err: HttpErrorResponse): string {
    if (err.status && err.status === Constants.statusCodes.BAD_REQUEST) {
        return NotifMsgs.serverErrors.BAD_REQUEST;
    } else if (err.status && err.status === Constants.statusCodes.UNAUTHORIZED) {
        return NotifMsgs.serverErrors.UNAUTHORIZED;
    } else if (err.status && err.status === Constants.statusCodes.FORBIDDEN) {
        return NotifMsgs.serverErrors.FORBIDDEN;
    } else if (err.status && err.status === Constants.statusCodes.NOT_FOUND) {
        return NotifMsgs.serverErrors.BAD_REQUEST;
    } else if (err.status && err.status === Constants.statusCodes.INTERNAL_SERVER_ERROR) {
      if (!navigator.onLine) {
        return NotifMsgs.serverErrors.NO_INTERNET_CONNECTION;
      }
  
      return err.error.error ? err.error.error : err.error.message ? err.error.message : err.error.toString();
    } else if (err.status && err.status === Constants.statusCodes.BAD_GATEWAY) {
        return NotifMsgs.serverErrors.INTERNAL_SERVER_ERROR;
    } else if (err.status && err.status === Constants.statusCodes.SERVICE_UNAVAILABLE) {
        return NotifMsgs.serverErrors.INTERNAL_SERVER_ERROR;
    } else if (err.status && err.status === Constants.statusCodes.GATEWAY_TIMEOUT) {
        return NotifMsgs.serverErrors.INTERNAL_SERVER_ERROR;
    } else {
        return NotifMsgs.serverErrors.SOMETHING_WENT_WRONG;
    }
  }
}

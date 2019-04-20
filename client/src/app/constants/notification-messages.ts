export class NotifMsgs {
    public static readonly serverErrors = {
        BAD_REQUEST: 'Invalid request.',
        UNAUTHORIZED: 'Invalid request.',
        FORBIDDEN: 'Access denied.',
        NOT_FOUND: 'Resource not found.',
        INTERNAL_SERVER_ERROR: 'Server did not respond. Please try again later.',
        SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
        NO_INTERNET_CONNECTION: 'No internet coneection.'
    };

    public static readonly success = {
        LOGOUT: 'Logout successfull.'
    };
}

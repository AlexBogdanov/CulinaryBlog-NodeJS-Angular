export class Constants {
    public static readonly common = {
        SERVER_BASE_PATH: 'http://localhost:8080'
    };

    public static readonly statusCodes = {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
    };

    public static readonly dataTypes = {
        USER: 0,
        ARTICLE: 1,
        RECIPE: 2
    };
};

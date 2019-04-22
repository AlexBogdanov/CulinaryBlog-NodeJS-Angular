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

    public static readonly warning = {
        USERNAME_TOO_SHORT: 'Username should be atleast 3 characters long.',
        PASSWORD_TOO_SHORT: 'Password should be atleast 6 characters long.',
        FIRST_NAME_REQUIRED: 'First name is required field.',
        LAST_NAME_REQUIRED: 'Last name is required field.',
        EMAIL_REQUIRED: 'Email is required field.',
        TITLE_TOO_SHORT: 'Title should be atleast 5 characters long.',
        DESCRIPTION_TOO_SHORT: 'Description is too short.',
        NAME_TOO_SHORT: 'Name should be atleast 5 characters long.',
        PREPARATION_TOO_SHORT: 'How to prepare is too short.',
        PRODUCT_ADDED: 'You have already added this product to your list of products.',
        PRODUCT_NOT_IN_LIST: 'This product is not in your list anymore.',
        INVALID_PRODUCT: 'Invalid product.',
        NOT_ENOUGH_PRODUCTS: 'You should add atleast 3 products to your recipe.'
    };
};

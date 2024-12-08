// Auth
export const LOGIN = '/auth/adminLogin';

// Customers
export const GET_CUSTOMERS = '/admin/getAllCustomers';
export const GET_CUSTOMERS_BY_ID = '/admin/getOneCustomer';
export const GET_ALL_CUSTOMERS_ORDER = '/admin/getAllCustomerOrders';
export const GET_ALL_CUSTOMERS_PROCESSING_ORDER =
  '/admin/getAllCustomerProcessingOrders';
export const GET_ALL_CUSTOMERS_COMPLETED_ORDER =
  '/admin/getAllCustomerCompletedOrders';
export const GET_ALL_CUSTOMERS_CANCELLED_ORDER =
  '/admin/getAllCustomerCancelledOrders';

export const SEARCH_ALL_CUSTOMERS_ORDER = '/admin/searchCustomerOrders';

// Partners
export const GET_PARTNERS = '/admin/getAllPartners';

// Orders
export const GET_ORDERS = '/admin/getAllOrders';

// Payments
export const GET_TRANSACTIONS = '/admin/balance-transactions';
export const FILTER_TRANSACTIONS = '/admin/transactionStatus';

// Staffs
export const CREATE_STAFF = '/admin/createStaff';
export const SEARCH_STAFF = '/admin/searchStaff';
export const GET_STAFF = '/admin/getAllStaff';
export const EDIT_STAFF = '/admin/editStaff';
export const GET_ONE_STAFF = '/admin/getOneStaff';
export const DEACTIVATATE_STAFF = '/admin/deactivateStaff';

// Notifications
export const GET_NOTIFICATIONS = '/admin/getUserNotificationSettings';
export const PUSH_NOTIFICATIONS = '/admin/sendPushNotification';
export const UPLOAD_MEDIA = '/admin/mediaUpload';

// Eedbacks
export const GET_FEEDBACKS = '/admin/getAllFeedback';
export const GET_MARKETPLACE_FEEDBACK = '/admin/getMarketplaceFeedback';
export const GET_PARTNER_FEEDBACK = '/admin/getPartnerFeedback';
export const GET_RECIPE_FEEDBACK = '/admin/getRecipeFeedback';
export const GET_GENERAL_FEEDBACK = '/admin/getGeneralFeedback';

// Categories
export const GET_CATEGORIES = '/category/findAll';
export const CREATE_CATEGORY = '/admin/createCategory';

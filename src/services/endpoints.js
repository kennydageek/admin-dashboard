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
export const SEARCH_CUSTOMERS = '/admin/searchCustomers';

// Partners
export const GET_PARTNERS = '/admin/getAllPartners';
export const GET_ENTREPRENEURS = '/admin/getAllEntrepreneurs';
export const GET_RESTAURANTS = '/admin/getAllResturants';
export const GET_VENDORS = '/admin/getAllVendors';
export const SEARCH_PARTNERS = '/admin/searchPartners';

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
export const UPDATE_NOTIFICATION = 'admin/updateNotification';

// Eedbacks
export const GET_FEEDBACKS = '/admin/getAllFeedback';
export const GET_MARKETPLACE_FEEDBACK = '/admin/getMarketplaceFeedback';
export const GET_PARTNER_FEEDBACK = '/admin/getPartnerFeedback';
export const GET_RECIPE_FEEDBACK = '/admin/getRecipeFeedback';
export const GET_GENERAL_FEEDBACK = '/admin/getGeneralFeedback';

// Categories
export const GET_CATEGORIES = '/category/findAll';
export const CREATE_CATEGORY = '/admin/createCategory';

// Overview
export const GET_DASHBOARD_CARDS = '/admin/getDashboardCards';
export const GET_DASHBOARD_CHART = '/admin/getDashboardChart';
export const GET_SALES_PROGRESS = '/admin/getSalesProgress';

// Blogs
export const GET_ALL_BLOGPOSTS = '/blog/getAll';
export const GET_BLOG_CATEGORIES = '/blog/getCategories';
export const CREATE_POST = '/blog/createPost';
export const CREATE_BLOG_CATEGORY = '/blog/createBlogCategory';
export const GET_A_BLOGPOSTS = '/blog/getPost';
export const UPDATE_POST = '/blog/updatePost';
export const DELETE_POST = '/blog/deletePost';

// Products
export const GET_ALL_PRODUCTS = '/admin/viewAllProducts';
export const ADD_TO_FEATURED_PRODUCTS = '/admin/addFeaturedProduct';
export const GET_FEATURED_PRODUCTS = '/admin/viewAllFeaturedProducts';
export const REMOVE_FEATURED_PRODUCTS = '/admin/featuredProduct';

// Recipes
export const GET_ALL_RECIPES = '/admin/viewAllRecipes';
export const ADD_FEATURED_RECIPES = '/admin/addFeaturedRecipe';
export const GET_FEATURED_RECIPES = '/admin/viewAllFeaturedRecipes';
export const REMOVE_FEATURED_RECIPES = '/admin/featuredRecipe';

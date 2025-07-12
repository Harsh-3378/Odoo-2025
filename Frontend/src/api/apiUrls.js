const API_URLS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    googleAuthApi: "/auth/googleAuth",
    signup: "/auth/register",
    getUser: "/auth/userData",
    getUserAll: "/user"
  },
  user: {
    getUser: "/user/get_user",
    acceptTearm: "/user/accept_terms",
    changeEmail: "/user/change-email",
    resetPassword: "/user/change-password",
    changeEmailOtp: "/user/change-email/otp",
    updateUser: "/user/",
    changeOrganization: "/user/change-organization",
  },
  product: {
    create: "/product/add",
    getAll: "/product/all",
    getById: "/product", // <-- Remove trailing slash, so usage is `/product/:id`
    update: "/product/update",
    delete: "/product/delete",
    getByCategory: "/product/category", // <-- Add this line
  },
  slot: {
    getAllSlots: "/slots",
    slotGenerator: "/slots/generate",
    slotPreview: "/slots/preview",
  },
};

export default API_URLS;

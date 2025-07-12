const API_URLS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    googleAuthApi: "/auth/googleAuth",
    signup: "/auth/register",
    getUser: "/auth/userData",
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
    getAll: "/product/get_all",
    getById: "/product/get_by_id",
    update: "/product/update",
    delete: "/product/delete",
  },
  slot: {
    getAllSlots: "/slots",
    slotGenerator: "/slots/generate",
    slotPreview: "/slots/preview",
  },
};

export default API_URLS;

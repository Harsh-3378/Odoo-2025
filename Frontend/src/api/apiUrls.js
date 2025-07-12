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
  slot: {
    getAllSlots: "/slots",
    slotGenerator: "/slots/generate",
    slotPreview: "/slots/preview",
  },
};

export default API_URLS;

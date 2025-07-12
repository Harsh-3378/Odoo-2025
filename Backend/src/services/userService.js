import User from "../models/User.js";

const DEFAULT_USERS = [
  {
    _id: "68723270a827bf2f517d0c1f",
    username: "naya_2ed67f",
    first_name: "Nayan",
    last_name: "Sukhadia",
    email: "nayansukhadiya31@gmail.com",
    avatar:
      "https://res.cloudinary.com/dqhmod58r/image/upload/v1752314494/expenses/hni15unmqu6xrkspkbsz.jpg",
    points: 100,
    role: "user",
    isVerified: false,
    createdAt: "2025-07-12T10:01:20.108Z",
  },
  {
    _id: "687236170a1829f883d9bb02",
    username: "vasu_373c30",
    first_name: null,
    last_name: null,
    email: "vasubhalani@gmail.com",
    avatar: null,
    points: 100,
    role: "user",
    isVerified: false,
    createdAt: "2025-07-12T10:16:55.694Z",
  },
  {
    _id: "687236390a1829f883d9bb05",
    username: "22cs_7f8765",
    first_name: null,
    last_name: null,
    email: "22cs009@charusat.edu.in",
    avatar: null,
    points: 100,
    role: "user",
    isVerified: false,
    createdAt: "2025-07-12T10:17:29.177Z",
  },
  {
    _id: "6872368d0a1829f883d9bb08",
    username: "pawa_a0c8f9",
    first_name: null,
    last_name: null,
    email: "pawarharsh756@gmail.com",
    avatar: null,
    points: 100,
    role: "user",
    isVerified: false,
    createdAt: "2025-07-12T10:18:53.733Z",
  },
  {
    _id: "687236ba0a1829f883d9bb0b",
    username: "23cs_1adda2",
    first_name: null,
    last_name: null,
    email: "23cs096@charusat.edu.in",
    avatar: null,
    points: 100,
    role: "user",
    isVerified: false,
    createdAt: "2025-07-12T10:19:38.481Z",
  },
  {
    _id: "6872408e0084b59424301da9",
    username: "naya_8b3e9a",
    first_name: "Nayan",
    last_name: "Sukhadia",
    email: "nayansukhadiya3105@gmail.com",
    avatar:
      "https://res.cloudinary.com/dqhmod58r/image/upload/v1752318126/expenses/nzsa3xcxnbynmzucjww0.png",
    points: 100,
    role: "user",
    isVerified: false,
    createdAt: "2025-07-12T11:01:34.399Z",
  },
];

const getAllUsers = async () => {
  // Exclude password field
  const users = await User.find({}, "-password");
  if (!users || users.length === 0) {
    return DEFAULT_USERS;
  }
  return users;
};

export default {
  getAllUsers,
};

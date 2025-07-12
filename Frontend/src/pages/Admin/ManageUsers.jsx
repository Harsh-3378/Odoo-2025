import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/services/Product/Products"; // Import API call
import { useEffect, useState } from "react";

// Default user list
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

export default function ManageUsers() {
  // Use default users as initial state
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch users on mount
//     const fetchUsers = async () => {
//       try {
//         const userList = await getAllUsers();
//         setUsers(userList);
//       } catch (err) {
//         setUsers(DEFAULT_USERS); // fallback to default list on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   if (loading) return <div className="p-8 text-center">Loading users...</div>;

  return (
    <div className="mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="flex gap-4 mb-6 justify-center">
        <Button>Manage User</Button>
        <Button variant="outline">Manage Orders</Button>
        <Button variant="outline">Manage Listings</Button>
      </div>
      <h2 className="text-lg font-semibold mb-4">Manage Users</h2>
      {/* Render users in a table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Avatar</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Verified</th>
              <th className="px-4 py-2 border">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border text-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  ) : (
                    <span className="inline-block w-10 h-10 rounded-full bg-gray-200" />
                  )}
                </td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <Badge>{user.role}</Badge>
                </td>
                <td className="px-4 py-2 border">
                  {user.isVerified ? (
                    <Badge variant="success">Yes</Badge>
                  ) : (
                    <Badge variant="destructive">No</Badge>
                  )}
                </td>
                <td className="px-4 py-2 border">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

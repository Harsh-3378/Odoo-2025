import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { selectCurrentUser } from "@/state/authSlice";
import { useSelector } from "react-redux";
import ProductList from "../Product/ProductList";
import PurchaseRequestsTable from "./PurchaseRequestsTable";

export default function UserProfile() {
  const user = useSelector(selectCurrentUser);

  if (!user) return <div className="p-8 text-center">No user data found.</div>;

  return (
    <div className=" mx-auto py-10 px-4">
      <Card className="p-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src={user.avatar || "/placeholder.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg bg-gray-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.png";
            }}
          />
          <Badge variant={user.isVerified ? "success" : "secondary"}>
            {user.isVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold mb-1">
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.username || user.email}
            <span className="ml-2 text-base text-muted-foreground font-normal">
              @{user.username}
            </span>
          </h2>
          <p className="text-muted-foreground mb-2">{user.email}</p>
          <p className="mb-2">{user.bio}</p>
          <div className="flex flex-wrap gap-4 mb-2">
            <span>
              <strong>Gender:</strong> {user.gender}
            </span>
            <span>
              <strong>Role:</strong> {user.role}
            </span>
            <span>
              <strong>Points:</strong> {user.points}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-2">
            <span>
              <strong>Location:</strong> {user.location?.city}, {user.location?.state},{" "}
              {user.location?.country}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-2">
            <span>
              <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </span>
            <span>
              <strong>Last Active:</strong> {new Date(user.lastActive).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-2">
            <span>
              <strong>Total Swaps:</strong> {user.stats?.totalSwaps ?? 0}
            </span>
            <span>
              <strong>Total Listings:</strong> {user.stats?.totalListings ?? 0}
            </span>
            <span>
              <strong>Rating:</strong> {user.stats?.rating ?? 0} ({user.stats?.reviewCount ?? 0}{" "}
              reviews)
            </span>
            <span>
              <strong>Sustainability Score:</strong> {user.stats?.sustainabilityScore ?? 0}
            </span>
          </div>
        </div>
      </Card>
      {/* Preferences */}
      <Card className="mt-8 p-6">
        <h3 className="text-lg font-semibold mb-3">Preferences</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <strong>Sizes:</strong>{" "}
            {user.preferences?.sizes?.length ? (
              user.preferences.sizes.join(", ")
            ) : (
              <span className="text-muted-foreground">None</span>
            )}
          </div>
          <div>
            <strong>Categories:</strong>{" "}
            {user.preferences?.categories?.length ? (
              user.preferences.categories.join(", ")
            ) : (
              <span className="text-muted-foreground">None</span>
            )}
          </div>
          <div>
            <strong>Brands:</strong>{" "}
            {user.preferences?.brands?.length ? (
              user.preferences.brands.join(", ")
            ) : (
              <span className="text-muted-foreground">None</span>
            )}
          </div>
        </div>
      </Card>
      <ProductList />
      <PurchaseRequestsTable />
    </div>
  );
}

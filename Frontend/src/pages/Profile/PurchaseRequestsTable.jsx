import { Button } from "@/components/ui/button";
import { getPurchaseRequests, updatePurchaseRequestStatus } from "@/services/Product/Products";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PurchaseRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getPurchaseRequests();
      setRequests(data);
    } catch {
      toast.error("Failed to load purchase requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await updatePurchaseRequestStatus(id, action);
      toast.success(action === "accepted" ? "Request accepted!" : "Request denied!");
      fetchRequests();
    } catch {
      toast.error("Failed to update request");
    }
  };

  if (loading) return <div className="p-4">Loading requests...</div>;
  if (!requests.length) return <div className="p-4">No purchase requests found.</div>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Purchase Requests</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Points</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Requested At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="p-2 border flex items-center gap-2">
                  <img
                    src={req.buyer?.avatar || "/placeholder.png"}
                    alt=""
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                  <span>
                    {req.buyer?.first_name && req.buyer?.last_name
                      ? `${req.buyer.first_name} ${req.buyer.last_name}`
                      : req.buyer?.username}
                  </span>
                </td>
                <td className="p-2 border">
                  {req.product?.title}
                  <div className="text-xs text-gray-500">{req.product?.description}</div>
                </td>
                <td className="p-2 border">{req.pointsOffered}</td>
                <td className="p-2 border capitalize">{req.status}</td>
                <td className="p-2 border">
                  {req.createdAt ? new Date(req.createdAt).toLocaleString() : ""}
                </td>
                <td className="p-2 border">
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAction(req._id, "accepted")}>
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(req._id, "rejected")}
                      >
                        Deny
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

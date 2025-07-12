import { ImageUploadComponent } from "@/components/ImageUploader/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/services/authApi";
import { selectCurrentUser, updateProfile } from "@/state/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const user = useSelector(selectCurrentUser) || {};
  const [form, setForm] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    bio: user.bio || "",
    gender: user.gender || "",
    avatar: user.avatar || "",
    location: {
      city: user.location?.city || "",
      state: user.location?.state || "",
      country: user.location?.country || "",
    },
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handler for avatar upload
  const handleAvatarUploaded = (urls) => {
    if (urls && urls.length > 0) {
      setForm((prev) => ({ ...prev, avatar: urls[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateUserProfile(form);
      dispatch(updateProfile(res.data.user));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-svh bg-main">
      <div className="flex flex-col gap-8 p-6 md:p-10 items-center justify-center bg-background/30 backdrop-blur-2xl rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-center gap-2">
          <div className="dark:flex items-center justify-start hidden">
            <img src="/scheduler_logo/Full_logo.svg" alt="Logo" className="h-8 w-auto" />
          </div>
          <div className="flex items-center justify-start dark:hidden">
            <img src="/scheduler_logo/Full_Logo_Blue.svg" alt="Logo" className="h-8 w-auto" />
          </div>
        </div>
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold mona-sans">Complete Your Profile</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Please fill in your details to continue
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <Label>First Name</Label>
                <Input name="first_name" value={form.first_name} onChange={handleChange} required />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input name="last_name" value={form.last_name} onChange={handleChange} required />
              </div>
              <div>
                <Label>Gender</Label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label>Bio</Label>
                <Input name="bio" value={form.bio} onChange={handleChange} required />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Label>Avatar</Label>
                <ImageUploadComponent onUploaded={handleAvatarUploaded} />
                {form.avatar && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={form.avatar}
                      alt="Avatar Preview"
                      className="w-20 h-20 rounded-full object-cover border shadow"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input name="city" value={form.location.city} onChange={handleChange} required />
              </div>
              <div>
                <Label>State</Label>
                <Input name="state" value={form.location.state} onChange={handleChange} required />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  name="country"
                  value={form.location.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}

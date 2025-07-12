import { ImageUploadComponent } from "@/components/ImageUploader/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/services/authApi";
import { selectCurrentUser, updateProfile } from "@/state/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProfileSetup.css";

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
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-svh bg-main">
      <div className="profile-setup-card shadow-xl backdrop-blur-2xl px-6 py-8 md:px-14 md:py-12 w-full max-w-2xl flex flex-col gap-8 items-center">
        <div className="flex justify-center gap-2">
          <div className="dark:flex items-center hidden">
            <img src="/scheduler_logo/Full_logo.svg" alt="Logo" className="h-8 w-auto" />
          </div>
          <div className="flex items-center dark:hidden">
            <img src="/scheduler_logo/Full_Logo_Blue.svg" alt="Logo" className="h-8 w-auto" />
          </div>
        </div>
        <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-3xl font-bold mona-sans tracking-tight">Complete Your Profile</h1>
            <p className="text-muted-foreground text-base">
              Please fill in your details to continue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div>
                <Label className="mb-1 block">First Name</Label>
                <Input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label className="mb-1 block">Last Name</Label>
                <Input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label className="mb-1 block">Gender</Label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="modern-input appearance-none"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label className="mb-1 block">Bio</Label>
                <Input
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Short bio about you"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <Label className="mb-1 block">Avatar</Label>
                <ImageUploadComponent onUploaded={handleAvatarUploaded} />
                {form.avatar && (
                  <div className="mt-2">
                    <img
                      src={form.avatar}
                      alt="Avatar Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg transition-all duration-200 ring-2 ring-primary/30"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label className="mb-1 block">City</Label>
                <Input
                  name="city"
                  value={form.location.city}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <Label className="mb-1 block">State</Label>
                <Input
                  name="state"
                  value={form.location.state}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Enter your state"
                />
              </div>
              <div>
                <Label className="mb-1 block">Country</Label>
                <Input
                  name="country"
                  value={form.location.country}
                  onChange={handleChange}
                  required
                  className="modern-input"
                  placeholder="Enter your country"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-2 modern-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updates = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      bio: req.body.bio,
      gender: req.body.gender,
      avatar: req.body.avatar,
      location: {
        city: req.body.location?.city,
        state: req.body.location?.state,
        country: req.body.location?.country,
      },
    };

    // Remove undefined fields
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) delete updates[key];
    });

    // If location exists, clean it too
    if (updates.location) {
      Object.keys(updates.location).forEach(k => {
        if (updates.location[k] === undefined) delete updates.location[k];
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Profile update error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



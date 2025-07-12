import { OAuth2Client } from 'google-auth-library';
import authService from '../services/authService.js'; 
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const googleAuthentication = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log('payload )))))))>>>', payload);
    const { email, name, given_name, family_name, picture, sub } = payload;

    // Check or create user in your system
    const result = await authService.loginOrRegisterGoogleUser({
      email,
      name,
      picture,
      given_name,
      family_name,
        googleId: sub,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({
      success: false,
      message: error.message || 'Invalid Google Token',
    });
  }
};


const jwt = require('jsonwebtoken');

const sendToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { 
      expiresIn: '72h',
      algorithm: 'HS256'
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: 72 * 60 * 60 * 1000,
  };

  res
    .cookie("token", token, options)
    .status(200)
    .json({ success: true, user });
};

module.exports = sendToken;

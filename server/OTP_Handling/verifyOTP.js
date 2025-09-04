const User = require("../schemas/user-schema");

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (user.isVerified) return res.status(400).send("User already verified");

    if (user.otp.toString() !== otp.toString() || user.otpExpiry < new Date()) {
      return res.status(400).send("Invalid or expired OTP");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).send("User verified successfully");
  } catch (err) {
    res.status(500).send("Verification failed: " + err.message);
  }
};

module.exports = verifyOTP;

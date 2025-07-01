// export const generateToken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   // Determine the cookie name based on the user's role
//   const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

//   res
//     .status(statusCode)
//     .cookie(cookieName, token, {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Choose cookie name based on role
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,         // ✅ Required on mobile/https
      sameSite: "None",     // ✅ Required for cross-origin cookies
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

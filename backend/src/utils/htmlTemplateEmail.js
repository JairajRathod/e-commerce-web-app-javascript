export default function htmlTemplateEmail(otp, mailType) {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f6fa;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 500px;
      background: #fff;
      margin: auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #4facfe;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #00c6ff;
      letter-spacing: 3px;
      margin: 20px 0;
    }
    p {
      font-size: 16px;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 OTP Verification</h2>
    <p>Dear User,</p>
    <p>Use the following One-Time Password (OTP) to complete your ${mailType}:</p>
    <div class="otp">${otp}</div>
    <p>This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.</p>
    <p>Thank you for registering with us!</p>
    <div class="footer">
      ${year} J-Commerce
    </div>
  </div>
</body>
</html>
`;
}

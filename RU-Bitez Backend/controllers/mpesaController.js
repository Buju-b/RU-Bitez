import axios from "axios";

const generateAccessToken = async () => {
  const consumer_key = "";
  const consumer_secret = "";
  const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

export const initiateSTKPush = async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;
    const accessToken = await generateAccessToken();
    
    const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

    const shortcode = ""; 
    const passkey = ""; 
    
    const password = Buffer.from(
      `${shortcode}${passkey}${timestamp}`
    ).toString("base64");

    const requestData = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: "https://1a90-41-90-172-31.ngrok-free.app/api/mpesa/callback",
      AccountReference: "RU-Bitez",
      TransactionDesc: "RUBitez Order Payment",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      message: "STK push initiated successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error initiating STK push:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to initiate STK push",
      error: error.response?.data || error.message,
    });
  }
}; 
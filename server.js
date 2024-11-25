require("dotenv").config();
const { SERVER_PORT = 5000, STRIPE_PRIVATE_KEY, STRIPE_PRICE_ID, CLIENT_URL } = process.env;
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(STRIPE_PRIVATE_KEY);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL || "http://localhost:3000", // Allow frontend origin
  })
);

app.post("/create-checkout-session", async (req, res) => {
    try {
      const { quantity = 1 } = req.body;
      const session = await stripe.checkout.sessions.create({
        success_url: `${CLIENT_URL}?success=true`,
        cancel_url: `${CLIENT_URL}?canceled=true`,
        line_items: [
          {
            price: STRIPE_PRICE_ID,
            quantity,
          },
        ],
        mode: "subscription", // Using subscription mode
        phone_number_collection: {
          enabled: true, // Enable phone number collection
        },
        billing_address_collection: "required", // Collect full billing address
        // Note: No need for customer_creation or customer_update in subscription mode
      });
  
      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe session creation failed:", error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

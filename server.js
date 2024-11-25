require("dotenv").config();
const { SERVER_PORT = 5001, STRIPE_PRIVATE_KEY, STRIPE_PRICE_ID, CLIENT_URL } = process.env;
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

// Subscription Checkout Session
app.post("/create-subscription-session", async (req, res) => {
  try {
    const { quantity = 1, priceId } = req.body; // Use priceId from the request body

    // Create the Stripe checkout session using the dynamic priceId
    const session = await stripe.checkout.sessions.create({
      success_url: `${CLIENT_URL}?success=true`,
      cancel_url: `${CLIENT_URL}?canceled=true`,
      line_items: [
        {
          price: priceId,  // Use the priceId dynamically from the request
          quantity,
        },
      ],
      mode: "subscription", // Using subscription mode
      phone_number_collection: {
        enabled: true, // Enable phone number collection
      },
      billing_address_collection: "required", // Collect full billing address
      shipping_address_collection: {
        allowed_countries: ["NO"], // Add allowed countries here
      },
      custom_fields: [
        {
          key: "BreadChoice", // Unique identifier for the first dropdown field
          label: {
            type: "custom",
            custom: "Brød 1",
          },
          type: "dropdown", // Specify dropdown type
          optional: false, // Make this field required
          dropdown: {
            options: [
              { label: "Baguette", value: "baguette" },
              { label: "Ciabatta", value: "ciabatta" },
              { label: "Focaccia", value: "focaccia" },
            ],
          },
        },
        {
          key: "BreadChoiceTwo", // Unique identifier for the second dropdown field
          label: {
            type: "custom",
            custom: "Brød 2",
          },
          type: "dropdown", // Specify dropdown type
          optional: false, // Make this field required
          dropdown: {
            options: [
              { label: "Baguette", value: "baguette" },
              { label: "Ciabatta", value: "ciabatta" },
              { label: "Focaccia", value: "focaccia" },
            ],
          },
        },
        {
          key: "customer_message", // Additional custom field
          label: {
            type: "custom",
            custom: "Melding til oss (valgfritt)",
          },
          type: "text", // Text input field
          optional: true, // Make this field optional
        },
      ],
    });


    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.post("/create-onetime-session", async (req, res) => {
  try {
    const { items } = req.body; // Items should be passed in the body

    const lineItems = items.map(item => ({
      price: item.priceId, // Use the priceId directly here
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${CLIENT_URL}?success=true`,
      cancel_url: `${CLIENT_URL}?canceled=true`,
      line_items: lineItems, // This is the list of items with priceId and quantity
      mode: "payment", // One-time payment mode
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "NO", "SE", "FI", "DK"],
      },
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

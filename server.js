require("dotenv").config();
const { SERVER_PORT = 5001, STRIPE_PRIVATE_KEY, STRIPE_PRICE_ID, CLIENT_URL } = process.env;
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(STRIPE_PRIVATE_KEY);
const sanityClient = require("@sanity/client");

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


const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "koixe24m", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  useCdn: true,
  apiVersion: '2024-02-11', // Ensure this matches your schema's API version
});

// Fetch delivery schedule data from Sanity
const fetchDeliverySchedule = async () => {
  const query = `*[_type == "deliverySchedule"][0]{
    specialDeliveryDays,
    blackoutDays
  }`;
  return await client.fetch(query);
};

// Fetch delivery alternatives data from Sanity
const fetchDeliveryAlternatives = async () => {
  const query = `*[_type == "deliveryAlternatives"][0]{
    pickupPriceId,
    deliveryPriceId
  }`;
  return await client.fetch(query);
};

const generateDeliveryAlternatives = async () => {
  try {
    // Fetch delivery alternatives data from Sanity
    const { pickupPriceId, deliveryPriceId } = await fetchDeliveryAlternatives();

    // Log the fetched price IDs to the console
    const deliveryPrices = []
    deliveryPrices.push(pickupPriceId);
    deliveryPrices.push(deliveryPriceId);
    return deliveryPrices;
  } catch (error) {
    console.error("Error fetching delivery alternatives:", error.message);
  }
};


// Generate allowed delivery dates based on Sanity data
const generateAllowedDates = async () => {
  const { specialDeliveryDays = [], blackoutDays = [] } = await fetchDeliverySchedule();

  const today = new Date();
  const allowedDays = [1, 4]; // Mondays (1) and Thursdays (4)
  const dates = [];

  for (let i = 1; i <= 56; i++) { // Generate for the next 4 weeks
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);

    const formattedDate = futureDate.toISOString().split("T")[0]; // YYYY-MM-DD

    // Determine if the date is valid
    const isAllowedDay = allowedDays.includes(futureDate.getDay());
    const isSpecialDay = specialDeliveryDays.includes(formattedDate);
    const isBlackoutDay = blackoutDays.includes(formattedDate);

    if ((isAllowedDay || isSpecialDay) && !isBlackoutDay) {
      const value = formattedDate.replace(/-/g, ""); // Convert to YYYYMMDD
      dates.push({
        label: futureDate.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
        value,
      });
    }
  }

  return dates;
};

app.post("/create-onetime-session", async (req, res) => {
  try {
    const { items } = req.body;

    // Fetch and generate allowed dates
    const allowedDates = await generateAllowedDates();
    const deliveryPrices = await generateDeliveryAlternatives();

    // Prepare line items
    const lineItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${CLIENT_URL}?success=true`,
      cancel_url: `${CLIENT_URL}?canceled=true`,
      line_items: lineItems,
      mode: "payment",
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["NO"], // Norway only
      },
      shipping_options: [
        {
          shipping_rate: deliveryPrices[0], // ID for "Henting"
        },
        {
          shipping_rate: deliveryPrices[1], // ID for "Levering"
        },
      ],
      custom_fields: [
        {
          key: "delivery_date",
          label: {
            type: "custom",
            custom: "Velg en dag for levering/henting av varer",  // Custom title for delivery date
          },
          type: "dropdown",
          optional: false,
          dropdown: {
            options: allowedDates,  // Use dynamically generated dates
          },
        },
      ],
      metadata: {
        order_summary: items
          .map((item) => `Product: ${item.name}, Quantity: ${item.quantity}`)
          .join("; "),
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

require("dotenv").config();
const { SERVER_PORT, STRIPE_PRIVATE_KEY, CLIENT_URL } = process.env;
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(STRIPE_PRIVATE_KEY);
const sanityClient = require("@sanity/client");
 
const app = express();
 
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://karlsonbrodbakst.netlify.app", // Default to production if CLIENT_URL is not defined
  })
);

 
const { createClient } = require("@sanity/client");
 
const client = createClient({
  projectId: "koixe24m", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  useCdn: true,
  apiVersion: "2024-02-11", // Ensure this matches your schema's API version
});
 
 
// Fetch delivery alternatives from Sanity
const fetchDeliveryAlternatives = async () => {
  const query = `*[_type == "deliveryAlternatives"][0]{
    pickupPriceId,
    deliveryPriceId
  }`;
  return await client.fetch(query);
};
 
// Validate postal code for home delivery
const isPostalCodeValid = async (postalCode) => {
  const query = `*[_type == "deliveryAlternatives"][0]{
    validPostalCodes
  }`;
  const data = await client.fetch(query);
  return data?.validPostalCodes.includes(postalCode);
};
 
// Fetch allowed delivery dates
// Fetch the products that have 'maxOrdersPerDay' set to true
const fetchMaxOrdersPerDayProducts = async () => {
  const query = `*[_type == "product" && maxOrdersPerDay == true]{
    price_id
  }`;
  return await client.fetch(query);
};

// Updated generateAllowedDates to handle 'fullyBookedDays' and max orders per day
const generateAllowedDates = async (items) => {
  const query = `*[_type == "deliverySchedule"][0]{
    specialDeliveryDays,
    blackoutDays,
    fullyBookedDays
  }`;
  const { specialDeliveryDays = [], blackoutDays = [], fullyBookedDays = [] } = await client.fetch(query);

  const today = new Date();
  const allowedDays = [1, 4]; // Mondays (1) and Thursdays (4)
  const dates = [];

  // Fetch products marked with 'maxOrdersPerDay'
  const maxOrdersProducts = await fetchMaxOrdersPerDayProducts();
  const maxOrdersProductPriceIds = maxOrdersProducts.map(product => product.price_id);
  
  // Check if any items in the cart have 'maxOrdersPerDay' flag
  const maxOrdersInCart = items.filter(item => maxOrdersProductPriceIds.includes(item.priceId));
  
  const hasMaxOrdersProduct = maxOrdersInCart.length > 0;

  // Filter out fully booked days if cart contains max orders products
  for (let i = 1; i <= 56; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);

    const formattedDate = futureDate.toISOString().split("T")[0]; // YYYY-MM-DD

    // Determine if the date is valid
    const isAllowedDay = allowedDays.includes(futureDate.getDay());
    const isSpecialDay = specialDeliveryDays.includes(formattedDate);
    const isBlackoutDay = blackoutDays.includes(formattedDate);
    const isFullyBookedDay = fullyBookedDays.includes(formattedDate);

    // If the cart contains max orders products, remove fully booked days from allowed dates
    if ((isAllowedDay || isSpecialDay) && !isBlackoutDay && (!hasMaxOrdersProduct || !isFullyBookedDay)) {
      const value = formattedDate.replace(/-/g, ""); // Convert to YYYYMMDD
      dates.push({
        label: futureDate.toLocaleDateString("nb-NO", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
        value,
      });
    } else if (hasMaxOrdersProduct && isFullyBookedDay) {
      // Log the fully booked days being removed from the allowed dates
      console.log(`Removing fully booked day: ${formattedDate} (${futureDate.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "short" })})`);
      console.log(`Special days: ${specialDeliveryDays}`);
      console.log(`Blackout days: ${blackoutDays}`);
    }
  }

  return dates;
};


// Create one-time session (updated to use the modified generateAllowedDates function)
app.post("/create-onetime-session", async (req, res) => {
  try {
    const { items, deliveryOption, postalCode } = req.body;

    if (deliveryOption === "hjemme-levering") {
      const isValidPostalCode = await isPostalCodeValid(postalCode);
      if (!isValidPostalCode) {
        return res.status(400).json({ error: "Ugyldig postnummer for hjemme levering." });
      }
    }

    const deliveryPrices = await fetchDeliveryAlternatives();
    const allowedDates = await generateAllowedDates(items);

    const shippingOptions =
      deliveryOption === "hente-i-butikk"
        ? [{ shipping_rate: deliveryPrices.pickupPriceId }]
        : [
            { shipping_rate: deliveryPrices.pickupPriceId },
            { shipping_rate: deliveryPrices.deliveryPriceId },
          ];

    const lineItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${CLIENT_URL}/stripe/success`,
      cancel_url: `${CLIENT_URL}?canceled=true`,
      line_items: lineItems,
      mode: "payment",
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["NO"] },
      shipping_options: shippingOptions,
      custom_fields: [
        {
          key: "delivery_date",
          label: { type: "custom", custom: "Velg en dag for levering/henting av varer" },
          type: "dropdown",
          optional: false,
          dropdown: { options: allowedDates },
        },
      ],
      metadata: {
        deliveryOption,
        postalCode,
        order_summary: items.map((item) => `Product: ${item.name}, Quantity: ${item.quantity}`).join("; "),
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
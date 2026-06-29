const Stripe = require('stripe');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    console.error("Missing STRIPE_SECRET_KEY environment variable");
    return { statusCode: 500, body: 'Missing Stripe secret key on server.' };
  }

  const stripe = Stripe(stripeSecretKey);
  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    if (webhookSecret && sig) {
      stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
    } else {
      if (!webhookSecret) {
        console.warn("STRIPE_WEBHOOK_SECRET environment variable is missing. Running in signature-bypass mode.");
      }
      stripeEvent = JSON.parse(event.body);
    }
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  // Handle checkout.session.completed event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const metadata = session.metadata;

    if (metadata && metadata.roomId) {
      console.log(`Processing booking for ${metadata.name} (${metadata.email}) from ${metadata.checkIn} to ${metadata.checkOut}`);

      // Calculate lastNight for Beds24 (checkout date minus 1 day)
      const lastNightDate = new Date(metadata.checkOut);
      lastNightDate.setDate(lastNightDate.getDate() - 1);
      const lastNightStr = `${lastNightDate.getFullYear()}-${String(lastNightDate.getMonth() + 1).padStart(2, '0')}-${String(lastNightDate.getDate()).padStart(2, '0')}`;

      // Split name into first and last names
      const nameParts = metadata.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Guest';

      // Prepare Beds24 API v1 JSON payload
      const beds24Payload = {
        authentication: {
          apiKey: process.env.BEDS24_API_KEY,
          propKey: process.env.BEDS24_PROP_KEY
        },
        roomId: metadata.roomId,
        firstNight: metadata.checkIn,
        lastNight: lastNightStr,
        numAdult: metadata.guests,
        guestFirstName: firstName,
        guestLastName: lastName,
        guestEmail: metadata.email,
        guestPhone: metadata.phone,
        guestComments: metadata.requests,
        notes: `Paid via Stripe Checkout. Session ID: ${session.id}`,
        status: "1" // Status 1 = Confirmed booking
      };

      try {
        const response = await fetch('https://api.beds24.com/json/setBooking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(beds24Payload)
        });

        const result = await response.json();
        console.log("Beds24 API response:", result);

        if (result && result.bookId) {
          console.log(`Successfully created booking in Beds24 with ID: ${result.bookId}`);
        } else if (result && result.error) {
          console.error(`Beds24 API returned error: ${result.error}`);
          return {
            statusCode: 500,
            body: `Beds24 Error: ${result.error}`
          };
        } else {
          console.error("Unknown response structure from Beds24:", result);
        }

      } catch (apiError) {
        console.error("Failed to connect to Beds24 API:", apiError);
        return {
          statusCode: 500,
          body: `Beds24 API Connection Failed: ${apiError.message}`
        };
      }
    } else {
      console.warn("Session completed, but missing metadata.");
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
};

const Stripe = require('stripe');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error("Missing STRIPE_SECRET_KEY environment variable");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe integration is not configured on the server.' })
    };
  }

  const stripe = Stripe(stripeSecretKey);

  try {
    const { checkIn, checkOut, guests, name, email, phone, requests } = JSON.parse(event.body);

    if (!checkIn || !checkOut || !guests || !name || !email || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required booking details.' })
      };
    }

    // Calculate total price based on website rules:
    // Weekdays (Sun-Thu nights) = £544
    // Weekends (Fri-Sat nights) = £646
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    
    if (end <= start) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Check-out date must be after check-in date.' })
      };
    }

    let totalNights = 0;
    let totalPrice = 0;
    let cur = new Date(start);

    while (cur < end) {
      const day = cur.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
      
      // Friday and Saturday nights are weekend rates
      if (day === 5 || day === 6) {
        totalPrice += 646;
      } else {
        totalPrice += 544;
      }
      totalNights++;
      cur.setDate(cur.getDate() + 1);
    }

    const hostUrl = process.env.URL || 'https://www.hopnestretreats.co.uk';

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'The Bell Tent Retreat',
            description: `${checkIn} to ${checkOut} (${totalNights} nights) — ${guests} guests`,
          },
          unit_amount: totalPrice * 100, // Stripe expects amount in pence
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${hostUrl}/bell-tents.html?booking=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${hostUrl}/bell-tents.html?booking=cancelled`,
      customer_email: email,
      metadata: {
        roomId: '699023',
        checkIn,
        checkOut,
        guests,
        name,
        email,
        phone,
        requests: requests || '',
        totalNights: String(totalNights),
        totalPrice: String(totalPrice)
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: session.url })
    };

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const SITE_URL = process.env.SITE_URL || 'https://flightmanager2026.pl';

const PACKAGES = {
  cash_50k:   { cash: 50000,    pts: 0,     name: '$50 000 w grze',    amount: 199   },
  cash_200k:  { cash: 200000,   pts: 0,     name: '$200 000 w grze',   amount: 499   },
  cash_500k:  { cash: 500000,   pts: 0,     name: '$500 000 w grze',   amount: 999   },
  cash_2m:    { cash: 2000000,  pts: 0,     name: '$2 000 000 w grze', amount: 2499  },
  cash_5m:    { cash: 5000000,  pts: 0,     name: '$5 000 000 w grze', amount: 4999  },
  cash_15m:   { cash: 15000000, pts: 0,     name: '$15 000 000 w grze',amount: 9999  },
  cash_50m:   { cash: 50000000, pts: 0,     name: '$50 000 000 w grze',amount: 24999 },
  pts_200:    { cash: 0,  pts: 200,   name: '200 PKT',    amount: 99   },
  pts_1000:   { cash: 0,  pts: 1000,  name: '1 000 PKT',  amount: 399  },
  pts_5000:   { cash: 0,  pts: 5000,  name: '5 000 PKT',  amount: 1499 },
  pts_15000:  { cash: 0,  pts: 15000, name: '15 000 PKT', amount: 3499 },
  pts_50000:  { cash: 0,  pts: 50000, name: '50 000 PKT', amount: 7999 },
  pack_start: { cash: 500000,   pts: 500,   name: 'Pakiet Startowy', amount: 1299  },
  pack_pro:   { cash: 3000000,  pts: 3000,  name: 'Pakiet Pro',      amount: 5999  },
  pack_elite: { cash: 15000000, pts: 15000, name: 'Pakiet Elite',    amount: 14999 },
};

exports.createCheckoutSession = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY'] })
  .https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', SITE_URL);
    res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
    if (req.method !== 'POST')   { res.status(405).json({ error: 'Method not allowed' }); return; }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    let uid;
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      uid = decoded.uid;
    } catch (e) { res.status(401).json({ error: 'Unauthorized' }); return; }

    const { packageId } = req.body;
    const pkg = PACKAGES[packageId];
    if (!pkg) { res.status(400).json({ error: 'Invalid package' }); return; }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: [{ price_data: { currency: 'pln', product_data: { name: 'Flight Manager 2026 — ' + pkg.name }, unit_amount: pkg.amount }, quantity: 1 }],
      mode: 'payment',
      success_url: SITE_URL + '/?payment=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url:  SITE_URL + '/?payment=cancelled',
      metadata: { uid, packageId, cash: String(pkg.cash), pts: String(pkg.pts) },
      locale: 'pl',
    });
    res.json({ url: session.url, sessionId: session.id });
  });

exports.stripeWebhook = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'] })
  .https.onRequest(async (req, res) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) { res.status(400).send('Webhook Error: ' + err.message); return; }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      if (session.payment_status !== 'paid') { res.json({ received: true }); return; }
      const { uid, cash, pts } = session.metadata;
      const cashNum = parseInt(cash) || 0, ptsNum = parseInt(pts) || 0;
      const updates = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
      if (cashNum > 0) updates.cash   = admin.firestore.FieldValue.increment(cashNum);
      if (ptsNum  > 0) updates.points = admin.firestore.FieldValue.increment(ptsNum);
      await admin.firestore().collection('players').doc(uid).update(updates);
    }
    res.json({ received: true });
  });
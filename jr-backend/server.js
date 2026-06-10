require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());          // lets your React site call this server
app.use(express.json());  // lets you read JSON bodies

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JR backend is alive' });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  res.json({ reply: `You said: ${message}` }); // placeholder for AI later
});

const packages = [
  {
    id: 'web-basic',
    category: 'website',
    name: 'Business Website',
    price: 2500,
    currency: 'AED',
    features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup'],
    delivery: '7-10 days'
  },
  {
    id: 'web-ecom',
    category: 'website',
    name: 'E-commerce Store',
    price: 6000,
    currency: 'AED',
    features: ['Shopify/WooCommerce', 'Up to 30 products', 'Payment gateway', 'Training session'],
    delivery: '2-3 weeks'
  },
  {
    id: 'meta-ads',
    category: 'marketing',
    name: 'Meta Ads Management',
    price: 1500,
    currency: 'AED',
    features: ['Campaign setup', 'Ad creatives', 'Weekly optimization', 'Monthly report'],
    delivery: 'Monthly retainer'
  }
];

app.get('/api/packages', (req, res) => {
  const { category } = req.query;
  const result = category ? packages.filter(p => p.category === category) : packages;
  res.json(result);
});

app.listen(4000, () => console.log('Running on http://localhost:4000'));
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const dbConfig = require('./config/key');
const productRoutes = require('./router/product');
const brandRoutes = require('./router/brand');
const sizeSystemRoutes = require('./router/sizeSystem');
const authRoutes = require('./router/auth');
const shopRoutes = require('./router/shop');
const adminRoutes = require('./router/admin');
const paymentRoutes = require('./router/payment');
const stripeWebhookRoutes = require('./router/stripeWebhook');
const initialDbCollections = require('./config/dbInitialCollections');
const corsOptions = require('./config/corsOptions');

const app = express();

let PORT = process.env.PORT || 5000;
app.use(cors(corsOptions));

app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhookRoutes)

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// app.use(cors());

// app.use((req, res, next) => {
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//       res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Headers, X-Requested-With, X-Access-Token');
//       next();
// });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/admin', brandRoutes);
app.use('/api/admin', sizeSystemRoutes);
app.use('/api/admin', productRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/payment', paymentRoutes);

app.use((req, res, next) => {
      const error = new Error('Requested resources were not found.');
      error.statusCode = 404;
      next(error);
})

app.use((error, req, res, next) => {
      const statusCode = error.statusCode || 500;
      const { message, data } = error;
      console.log('error handler - message: ', message);
      console.log('error handler - data: ', data);
      console.log(error)
      res.status(statusCode).json({ message: message, data: data })
});

const connect = mongoose.connect(dbConfig.mongoURI,
      {
            useNewUrlParser: true, useUnifiedTopology: true,
      })
      .then(() => {
            console.log('MongoDB connected.');
            initialDbCollections.initialDbRole();
      })
      .catch(err => console.log(err));

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});
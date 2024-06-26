require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const appRoutes = require('./routes.js');
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use('/api', appRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
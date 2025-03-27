const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Database
const sequelize = require('./src/config/database');

// Route files
const leads = require('./src/routes/leads');

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/leads', leads);

const PORT = process.env.PORT || 3000;

// Sync database
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
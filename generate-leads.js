const { faker } = require('@faker-js/faker');
const sequelize = require('./src/config/database');
const Lead = require('./src/models/Lead');

async function generateLeads(count = 500) {
  try {
    // Make sure database connection is established
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    console.log(`Generating ${count} fake leads...`);
    
    const leads = [];
    
    for (let i = 0; i < count; i++) {
      const hasTradeIn = Math.random() > 0.7; // 30% chance of having a trade-in
      
      const lead = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        hasTradeIn,
        tradeInVin: hasTradeIn ? faker.string.alphanumeric(17).toUpperCase() : null,
        purchaseIntentionComments: Math.random() > 0.5 ? faker.lorem.paragraph(2) : null,
      };
      
      leads.push(lead);
      
      if ((i + 1) % 100 === 0) {
        console.log(`Created ${i + 1} leads...`);
      }
    }
    
    // Insert all leads into the database
    await Lead.bulkCreate(leads);
    
    console.log(`Successfully inserted ${count} leads into the database!`);
    process.exit(0);
  } catch (error) {
    console.error('Error generating leads:', error);
    process.exit(1);
  }
}

generateLeads();
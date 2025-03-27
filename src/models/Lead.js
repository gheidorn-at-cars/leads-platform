const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lead = sequelize.define('Lead', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hasTradeIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tradeInVin: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      tradeInVinRequired(value) {
        if (this.hasTradeIn && !value) {
          throw new Error('Trade-in VIN is required when hasTradeIn is true');
        }
      }
    }
  },
  purchaseIntentionComments: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

module.exports = Lead;

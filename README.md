# Leads API

A REST API for managing sales leads built with Node.js, Express, and SQLite.

## Requirements

- Node.js

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the `.env` file (optional, for custom PORT):
   ```
   PORT=3000
   ```
4. Start the development server:
   ```
   npm run dev
   ```
   
## Generate Sample Data

To generate 500 random leads:

```
node generate-leads.js
```

## API Endpoints

### Leads

- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get a specific lead
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

## Lead Model

A lead represents a potential customer who must be qualified to become a prospect.

- `name` - The lead's full name
- `email` - The lead's email address
- `phoneNumber` - The lead's phone number
- `hasTradeIn` - Boolean flag indicating if the lead has a trade-in vehicle
- `tradeInVin` - The VIN of the trade-in vehicle (required if hasTradeIn is true)
- `purchaseIntentionComments` - Comments about the lead's intention to purchase
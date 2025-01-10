# Cryptocurrency Price Tracker

A Node.js application that tracks cryptocurrency prices using the CoinGecko API. The application fetches and stores price data for Bitcoin, Ethereum, and Matic, and provides APIs to retrieve statistics and price deviations.

## Features

- Background job that fetches cryptocurrency data every 2 hours
- API endpoint to get latest cryptocurrency statistics
- API endpoint to get price standard deviation
- MongoDB integration for data persistence

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Bansal0527/Koinx.git
cd Konix
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=
COINGECKO_API_KEY=your_api_key_here
```

4. Get your CoinGecko API key:
- Visit [CoinGecko Pro](https://www.coingecko.com/en/api/pricing)
- Get Free API key
- Copy the API key to your `.env` file

## Running the Application

Development mode :
```bash
npm run dev
```


## API Endpoints

### Get Latest Statistics
```
GET /api/stats?coin=bitcoin
```
Query Parameters:
- `coin`: One of `bitcoin`, `ethereum`, or `matic-network`

Deployed
```bash
koinx-plq2.onrender.com/api/stats?coin=bitcoin
  ```

Sample Response:
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### Get Price Deviation
```
GET /api/deviation?coin=bitcoin
```
Query Parameters:
- `coin`: One of `bitcoin`, `ethereum`, or `matic-network`

Sample Response:
```json
{
  "deviation": 4082.48
}
```

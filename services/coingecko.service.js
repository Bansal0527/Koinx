const axios = require('axios');
const { COINGECKO_API_BASE_URL } = require('../config/constants');


exports.fetchCryptoData =  async (coinId) =>{
    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE_URL}/simple/price`,
        {
          params: {
            ids: coinId,
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true
          },
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-GSkfPyZmgNZTvv6THv2fgRpW', 
          }
        }
      );
      
      const data = response.data[coinId];
      console.log(data)
      return {
        coinId,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change
      };
    } catch (error) {
      throw new Error(`Failed to fetch data from CoinGecko: ${error.message}`);
    }
  }



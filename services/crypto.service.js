const Crypto = require('../models/crypto.model');
const { calculateStandardDeviation } = require('../utils/calculations');
const constants = require('../config/constants');  
const logger = require('../utils/logger');


exports.saveData =  async (cryptoData)=> {
    try {
      const crypto = new Crypto(cryptoData);
      await crypto.save();
      logger.info(`Data saved for ${cryptoData.coinId}`);
    } catch (error) {
      logger.error(`Error saving data for ${cryptoData.coinId}:`, error);
      throw error;
    }
  }

  exports.getLatestStats =  async (coin) =>{


    console.log(coin)
    const latestData = await Crypto.findOne({ coinId: coin })
      .sort({ timestamp: -1 });

    if (!latestData) {
      throw { status: 404, message: 'No data found for this coin' };
    }

    return {
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    };
  }

exports.calculateDeviation=  async (coin) =>{

    const data = await Crypto.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(constants.RECORDS_LIMIT)
      .select('price');

    if (!data.length) {
      throw { status: 404, message: 'No data found for this coin' };
    }

    const prices = data.map(item => item.price);
    return Number(calculateStandardDeviation(prices).toFixed(2));
  }



// src/jobs/fetch-crypto.job.js
const cron = require('node-cron');
const { COINS, UPDATE_INTERVAL } = require('../config/constants');
const {fetchCryptoData} = require('../services/coingecko.service');
const {saveData} = require('../services/crypto.service');
const logger = require('../utils/logger');

const fetchAndStoreCryptoData = async () => {
  const coins = Object.values(COINS);
  
  for (const coinId of coins) {
    try {
      const data = await fetchCryptoData(coinId);
      await saveData(data);
      logger.info(`Data fetched and saved for ${coinId}`);
    } catch (error) {
      logger.error(`Error in background job for ${coinId}:`, error);
    }
  }
};

const startCronJob = async () => {

  // await fetchAndStoreCryptoData();
  
  
  cron.schedule(UPDATE_INTERVAL, fetchAndStoreCryptoData);
  logger.info('Crypto fetch background job scheduled');
};

module.exports = { startCronJob };
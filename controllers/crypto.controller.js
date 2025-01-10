const { getLatestStats, calculateDeviation} = require('../services/crypto.service');


exports.getStats =  async (req, res)=> {
    try {
      const { coin } = req.query;
      const stats = await getLatestStats(coin);
      console.log("stats : ", stats)
      res.json(stats);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

exports.getDeviation = async (req, res)=> {
    try {
      const { coin } = req.query;
      const deviation = await calculateDeviation(coin);
      res.json({ deviation });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }



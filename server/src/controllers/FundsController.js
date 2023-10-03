const {Fund} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const funds = await Fund.findAll({
                limit: 10
            })
            res.send(funds)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the funds.'
            })
        }
    },
    async post (req, res) {
        try {
            const fund = await Fund.create(req.body)
            res.send(fund)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to create the fund.'
            })
        }
    },
    async getBySlug(req, res) {
        try {
          const fundSlug = req.params.fundSlug;

          const fund = await Fund.findOne({
            where: { fundSlug },
          });
    
          if (!fund) {
            return res.status(404).send({
              error: 'Fund not found.',
            });
          }
    
          res.send(fund);
        } catch (err) {
          res.status(500).send({
            error: 'An error has occurred trying to fetch the fund by slug.',
          });
        }
    }
}
var express = require('express')
var router = express.Router()
var axios = require('axios');
var { TOKEN } = require('./../config.js')

router.get('/summoner/:userName', (req, res) => {
  console.log(req.params);
  var summoner = req.params.userName;
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, {headers: {
    'X-Riot-Token': TOKEN
  }}
  )
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.send(err);
  })
})

router.get('/summoner/:id/rank', (req, res) => {
  console.log(req.params);
  var summonerId = req.params.id;
  axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {headers: {
    'X-Riot-Token': TOKEN
  }}
  )
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.send(err);
  })
})

module.exports = router;
/* eslint-disable global-require */
const express = require('express');
const data = {
  basketball: {
    shoes: require('./data/basketball-shoes.json'),
    apparel: require('./data/basketball-apparel.json'),
    accessories: require('./data/basketball-accessories.json'),
  },
  football: {
    cleats: require('./data/football-cleats.json'),
    apparel: require('./data/football-apparel.json'),
    accessories: require('./data/football-accessories.json'),
  },
  running: {
    shoes: require('./data/running-shoes.json'),
    apparel: require('./data/running-apparel.json'),
    accessories: require('./data/running-accessories.json'),
  },
};

const app = express();

app.get('/products/:group/:type', (req, res) => {
  const { group, type } = req.params;

  if (data[group] && data[group][type]) {
    res.send(data[group][type]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('adidas-api listening on port 3000!'); // eslint-disable-line no-console
});

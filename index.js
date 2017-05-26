/* eslint-disable global-require */
const express = require('express'); // eslint-disable-line import/newline-after-import
const collections = {
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
const router = express.Router();

router.get('/products/:group/:type', (req, res) => {
  const { group, type } = req.params;
  const { limit = 32, offset = 0 } = req.query;

  if (collections[group] && collections[group][type]) {
    const items = collections[group][type];

    res.send({
      items: [...items].splice(offset, limit),
      total: items.length,
    });
  } else {
    res.sendStatus(404);
  }
});

router.get('/products/:group/:type/:id', (req, res) => {
  const { group, type, id } = req.params;

  if (collections[group] && collections[group][type]) {
    const product = collections[group][type].find(p => p.id === id);

    if (product) res.send(product);
    else res.sendStatus(404);
  } else {
    res.sendStatus(404);
  }
});

app.use('/v1', router);
app.get('/', (req, res) => {
  res.send({
    docs: 'https://github.com/evgenyrodionov/adidas-api-demo',
    version: `1.0.0-${process.env.BUILD_DATE || 'local'}`,
  });
});

app.listen(3000, () => {
  console.log('adidas-api listening on port 3000!'); // eslint-disable-line no-console
});

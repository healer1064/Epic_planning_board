const express = require('express');
const sdk = require('v1sdk');
const axios = require('axios');

const server = new express();
server.use(express.json());

const token = process.env.TOKEN;
const v1 = sdk
  .axiosConnector(axios)(sdk.default)(
    'www7.v1host.com',
    'V1Production',
    443,
    true,
  )
  .withAccessToken(token);

server.get('/api', (req, res) => {
  v1.query({
    from: 'Epic',
    select: ['Name', 'Number', 'AssetType', 'Swag', 'Value'],
    filter: ["TaggedWith='groom'"],
  })
    .then(items => {
      res.send(items.data);
    })
    .catch(e => {
      console.log(e);
      res.send('error');
    });
});

server.put('/api/update', (req, res) => {
  v1.update(req.body._oid, { [req.body.updateKey]: req.body.updateValue })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

server.listen(9001);

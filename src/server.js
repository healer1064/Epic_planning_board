const express = require('express');
const path = require('path');
const fs = require('fs');
const sdk = require('v1sdk');
const axios = require('axios');

const server = new express();
const indexContents = fs.readFileSync(
  path.join(__dirname, '..', 'build', 'index.html'),
  'utf8',
);
const token = process.env.TOKEN;
const v1 = sdk
  .axiosConnector(axios)(sdk.default)(
    'www7.v1host.com',
    'V1Production',
    443,
    true,
  )
  .withAccessToken(token);

server.use(express.static(path.join(__dirname, '..', 'build')));
server.get('/', (req, res) => {
  res.send(`${indexContents}`);
});

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

server.listen(9000);

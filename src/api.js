import axios from 'axios';
import sdk, { axiosConnector } from 'v1sdk';
const axiosConnected = axiosConnector(axios)(sdk);

export default token =>
  axiosConnected('www7.v1host.com', 'V1Production', 443, true).withAccessToken(
    token,
  );

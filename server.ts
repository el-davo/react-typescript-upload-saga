import * as webpack from 'webpack';
import * as DevServer from 'webpack-dev-server';
import * as open from 'open';
import * as express from 'express';
import * as cors from 'cors';
import * as expressFileUpload from 'express-fileupload';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { error, info } from 'winston';
import { config } from './webpack.config';

new DevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  inline: true
}).listen(3000, 'localhost', (err) => {
  if (err) {
    return error(err);
  }

  info('Listening on port 3000');
  open('http://localhost:3000');
});

const uploadServer = express();
uploadServer.use(cors());

uploadServer.post('/upload', (req, res) => {
  res.status(200).send({status: 'Uploaded'});
});

uploadServer.listen(3001, (err) => {
  if (err) {
    return error(err);
  }

  info('Listening on port 3001 for uploaded files');
});

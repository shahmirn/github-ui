import http from 'http';
import express from 'express';
import { Options, createProxyMiddleware } from 'http-proxy-middleware';
import open from 'open';

import { config } from './config';

const serverPort = normalizePort(process.env.PORT || '3000');
const clientPort = normalizePort(process.env.CLIENT_PORT || '5173');

const app = express();

const apiProxyOptions: Options = {
  target: 'https://api.github.com/',
  secure: false,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
};
if (config.githubApi.accessToken) {
  apiProxyOptions.headers = {
    Authorization: `token ${config.githubApi.accessToken}`,
  };
}

app.use('/api', createProxyMiddleware(apiProxyOptions));

app.use(
  '/',
  createProxyMiddleware({
    target: `http://localhost:${clientPort}/`,
  }),
);

const server = http.createServer(app);
server.listen(serverPort);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: unknown }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof serverPort === 'string'
      ? 'Pipe ' + serverPort
      : 'Port ' + serverPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.debug('Listening on ' + bind);
  open(`http://localhost:${serverPort}`);
}

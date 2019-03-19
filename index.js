const { get, isFunction, bind, noop } = require('lodash');
const redis = require('redis');
const redisCommands = require('redis-commands');
const { promisify } = require('util');

const clients = {};

module.exports = {
  getClient,
};

function getClient(clientName = 'base', { onError = noop, promisify = false } = {}) {
  return get(clients, clientName, initRedisClient(promisify, onError));
}

function initRedisClient(promisify, onError) {
  const client = redis.createClient('redis://redis:6379');
  client.on('error', onError);
  if (promisify)
    return decorateClient(client);
  return client;
}

function decorateClient(client) {
  for (const propName in client) {
    if (isFunction(client[propName]))
      client[propName] = decorateMethod(client, client[propName], propName);
  }
  return client;
}

function decorateMethod(client, method, name) {
  if (redisCommands.exists(name))
    return bind(promisify(method), client);
  return method;
}

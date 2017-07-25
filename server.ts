import * as express from 'express';
import {ApiConfiguration} from './api/apiConfiguration';
require('dotenv').config();

let backApp = new ApiConfiguration(express(), normalizePort(process.env.PORT || 3000));
backApp.run();

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}
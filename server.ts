import * as express from 'express';
import { Util } from 'basicutil';
import { ApiConfiguration } from './api/apiConfiguration';
require('dotenv').config();

let backApp = new ApiConfiguration(express(), Util.normalizePort(process.env.PORT || 3000));
backApp.run();



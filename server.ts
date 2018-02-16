import * as express from 'express';
import { Util } from 'basicutil';
import { ApiConfiguration } from './api/apiConfiguration';
require('dotenv').config();

export class Server {
    private apiConfiguration: ApiConfiguration;

    /**
     * Initialize the HeroRouter
     */
    constructor(api: any, arrayPath: Array<string>, port?: number) {
        this.apiConfiguration = new ApiConfiguration(express(), Util.normalizePort(process.env.PORT || port || 3000), api, arrayPath);
    }

    public run() {
        this.apiConfiguration.run();
    }

}
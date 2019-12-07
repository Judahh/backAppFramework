import * as express from 'express';
import { ApiConfiguration } from './api/apiConfiguration';

export class Server {
    private apiConfiguration: ApiConfiguration;

    constructor(api: any, packageJSON: any) {
        this.apiConfiguration = new ApiConfiguration(express(), api, packageJSON);
    }

    public run() {
        this.apiConfiguration.run();
    }

}

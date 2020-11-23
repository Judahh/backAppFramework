/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel } from '@flexiblepersistence/service';
import BaseControllerDefault from './baseControllerDefault';
import ControllerStoreAdapter from '../adapter/controllerStoreAdapter';
import { Event, Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerStore
  extends BaseControllerDefault
  implements ControllerStoreAdapter {
  // @ts-ignore
  protected async storeElement(event: Event): Promise<ServiceModel> {
    // console.log('storeElement:', event);
    return this.event(event);
  }

  async store(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.create,
      this.storeElement.bind(this),
      true
    );
  }
}

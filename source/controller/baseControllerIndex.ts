/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel } from '@flexiblepersistence/service';
import ControllerIndexAdapter from '../adapter/controllerIndexAdapter';
import BaseControllerDefault from './baseControllerDefault';
import { Event, Operation } from 'flexiblepersistence';
// @ts-ignore
export default class BaseControllerIndex
  extends BaseControllerDefault
  implements ControllerIndexAdapter {
  protected async select(event: Event): Promise<ServiceModel> {
    return this.event(event);
  }

  async index(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.read,
      this.select.bind(this),
      true
    );
  }
}

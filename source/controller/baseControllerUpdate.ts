/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel } from '@flexiblepersistence/service';
import BaseControllerDefault from './baseControllerDefault';
import ControllerUpdateAdapter from '../adapter/controllerUpdateAdapter';
import { Event, Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerUpdate
  extends BaseControllerDefault
  implements ControllerUpdateAdapter {
  protected async updateElement(
    event: Event
  ): Promise<ServiceModel[] | ServiceModel> {
    return this.event(event);
  }

  async update(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.update,
      this.updateElement.bind(this)
    );
  }
}

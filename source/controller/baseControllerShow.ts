/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel } from '@flexiblepersistence/service';
import ControllerShowAdapter from '../adapter/controllerShowAdapter';
import BaseControllerDefault from './baseControllerDefault';
import { Event, Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerShow
  extends BaseControllerDefault
  implements ControllerShowAdapter {
  protected async selectAll(event: Event): Promise<Array<ServiceModel>> {
    return await this.event(event);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.read,
      this.selectAll.bind(this),
      false
    );
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel } from '@flexiblepersistence/service';
import ControllerShowAdapter from '../adapter/controllerShowAdapter';
import BaseControllerDefault from './baseControllerDefault';

// @ts-ignore
export default class BaseControllerShow
  extends BaseControllerDefault
  implements ControllerShowAdapter {
  protected async selectAll(filter?: unknown): Promise<Array<ServiceModel>> {
    return await this.service('selectAll', filter);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const object = {};
      const filter = req.params as unknown;
      object[this.elements] = await this.selectAll(filter);
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}

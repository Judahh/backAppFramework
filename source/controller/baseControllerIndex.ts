/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel } from '@flexiblepersistence/service';
import ControllerIndexAdapter from '../adapter/controllerIndexAdapter';
import BaseControllerDefault from './baseControllerDefault';
// @ts-ignore
export default class BaseControllerIndex
  extends BaseControllerDefault
  implements ControllerIndexAdapter {
  protected async selectById(id: string): Promise<ServiceModel> {
    return await this.service('selectById', id);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const object = {};
      if (this.element) object[this.element] = await this.selectById(id);
      else throw new Error('Element is not specified.');
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}

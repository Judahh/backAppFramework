/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import BaseControllerDefault from './baseControllerDefault';
import ControllerDeleteAdapter from '../adapter/controllerDeleteAdapter';
import { Event, Operation } from 'flexiblepersistence';
// @ts-ignore
export default class BaseControllerDelete
  extends BaseControllerDefault
  implements ControllerDeleteAdapter {
  protected async deleteElement(event: Event): Promise<number | boolean> {
    return this.event(event);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return this.generateEvent(
      req,
      res,
      Operation.delete,
      this.deleteElement.bind(this)
    );
  }
}

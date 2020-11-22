/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel, ServiceSimpleModel } from '@flexiblepersistence/service';
import BaseControllerDefault from './baseControllerDefault';
import ControllerStoreAdapter from '../adapter/controllerStoreAdapter';
import { Event, Operation } from 'flexiblepersistence';

// @ts-ignore
export default class BaseControllerStore
  extends BaseControllerDefault
  implements ControllerStoreAdapter {
  // @ts-ignore
  protected async storeElement(event: Event): Promise<ServiceModel> {
    return await this.service('create', event);
  }

  public async store(
    req: Request | { body: ServiceSimpleModel },
    res:
      | Response
      | {
          json: (arg0: {
            status?: boolean;
          }) => Response<any> | PromiseLike<Response<any>>;
          status: (
            arg0: number
          ) => {
            (): any;
            new (): any;
            send: {
              (arg0: { error: any }):
                | Response<any>
                | PromiseLike<Response<any>>;
              new (): any;
            };
          };
        }
  ): Promise<Response> {
    try {
      // console.log(req);
      const content = req.body as ServiceSimpleModel;
      const object = {};
      const event = new Event({
        operation: Operation.create,
        single: true,
        content: content,
      });
      if (this.element)
        object[this.element] = (await this.storeElement(event))['receivedItem'];
      else throw new Error('Element is not specified.');
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}

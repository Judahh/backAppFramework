/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { ServiceModel, ServiceSimpleModel } from '@flexiblepersistence/service';
import { Default } from 'default-initializer';
import { Handler, Event, Operation } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import DatabaseHandlerInitializer from '../database/databaseHandlerInitializer';
settings.initFunction = 'init';
export default class BaseControllerDefault extends Default {
  protected errorStatus: {
    [error: string]: number;
  } = { Error: 400, error: 403, TypeError: 403, RemoveError: 400 };
  // @ts-ignore
  protected abstract elements: string;

  protected nameService: string | undefined;

  protected eventHandler: Handler | undefined;

  constructor(initDefault: DatabaseHandlerInitializer) {
    super(initDefault);
  }

  init(initDefault: DatabaseHandlerInitializer): void {
    super.init(initDefault);
    this.eventHandler = initDefault.eventHandler;
    // console.log(this.handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async event(event: Event): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!this.journaly) reject(new Error('No journaly connected!'));
      if (this.eventHandler) {
        this.eventHandler
          .addEvent(event)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      } else reject(new Error('No handler connected!'));
    });
  }

  protected async generateEvent(
    req: Request,
    res: Response,
    operation: Operation,
    useFunction: (
      event: Event
    ) => Promise<Array<ServiceModel> | ServiceModel | number | boolean>,
    singleDefault?: boolean
  ): Promise<Response> {
    try {
      const content = req.body as ServiceSimpleModel;
      const object = {};
      const filter = req.params?.filter as unknown;
      const name = req.params?.name as string;
      let single;
      if (singleDefault !== undefined) single = singleDefault;
      else single = (req.params?.single as unknown) as boolean;
      const event = new Event({
        operation,
        single: single,
        content: content,
        selection: filter,
        name: name,
      });

      // console.log('Event', event);

      if (this.element)
        object[this.element] = (await useFunction(event))['receivedItem'];
      else throw new Error('Element is not specified.');
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Default } from 'default-initializer';
import { Handler, Event } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import BaseControllerDefaultInitializer from './baseControllerDefaultInitializer';
settings.initFunction = 'init';
export default class BaseControllerDefault extends Default {
  protected errorStatus: {
    [error: string]: number;
  } = { Error: 400, error: 403, TypeError: 403, RemoveError: 400 };
  // @ts-ignore
  protected abstract elements: string;

  protected nameService: string | undefined;

  protected handler: Handler | undefined;

  constructor(initDefault: BaseControllerDefaultInitializer) {
    super(initDefault);
  }

  init(initDefault: BaseControllerDefaultInitializer): void {
    super.init(initDefault);
    this.handler = initDefault.handler;
    // console.log(this.handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async service(method: string, event: Event): Promise<any> {
    if (!this.journaly)
      return new Promise((resolve, reject) => {
        reject(new Error('No journaly connected!'));
      });
    if (this.handler) {
      return await this.handler.addEvent(event);
    } else
      return new Promise((resolve, reject) => {
        reject(new Error('No handler connected!'));
      });
    // if (!this.nameService)
    //   if (this.element) {
    //     this.nameService =
    //       this.element.charAt(0).toUpperCase() + this.element.slice(1);
    //     if (this.element.includes('Controller')) {
    //       this.nameService = this.nameService.replace('Controller', 'Service');
    //     } else {
    //       this.nameService = this.nameService + 'Service';
    //     }
    //   }

    // console.log(this.nameService + '.' + method, ...args);
    // return this.journaly.publish(this.nameService + '.' + method, ...args);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// file deepcode ignore no-any: any needed
// file deepcode ignore object-literal-shorthand: argh
import { BaseServiceDefault } from '@flexiblepersistence/service';
import {
  PersistenceAdapter,
  PersistenceInputCreate,
  PersistencePromise,
  PersistenceInputDelete,
  PersistenceInputUpdate,
  PersistenceInputRead,
} from 'flexiblepersistence';
export default class TestService
  extends BaseServiceDefault
  implements PersistenceAdapter {
  private aggregateFromReceivedArray(receivedItem, realInput) {
    return realInput.map((value, index) =>
      this.aggregateFromReceived(receivedItem[index], value)
    );
  }

  private aggregateFromReceived(receivedItem, value) {
    const id = this.getIdFromReceived(receivedItem);
    if (id)
      return {
        ...value,
        id: id,
      };
    return value;
  }

  private getIdFromReceived(receivedItem) {
    return receivedItem?.id?.toString() || receivedItem?._id?.toString();
  }

  private realInput(input) {
    let realInput = input.item ? input.item : {};
    if (Array.isArray(realInput))
      realInput = this.aggregateFromReceivedArray(
        input['receivedItem'],
        realInput
      );
    else
      realInput = this.aggregateFromReceived(input['receivedItem'], realInput);

    // console.log(realInput);
    return realInput;
  }
  private persistencePromise(input, method, resolve, reject) {
    // console.log(method);
    const input1 = !method.includes('create')
      ? method.includes('ById')
        ? input.id
        : input.selectedItem
      : this.realInput(input);
    const input2 = this.realInput(input);
    // console.log(input1);
    // console.log(input2);
    this.dAO(method, input1, input2)
      .then((output) => {
        const persistencePromise: PersistencePromise = {
          receivedItem: output,
          result: output,
          selectedItem: input.selectedItem,
          sentItem: input.item, //| input.sentItem,
        };
        // console.log(persistencePromise);
        resolve(persistencePromise);
      })
      .catch((error) => {
        reject(error);
      });
  }
  private makePromise(input, method): Promise<PersistencePromise> {
    return new Promise((resolve, reject) => {
      this.persistencePromise(input, method, resolve, reject);
    });
  }
  async close(): Promise<boolean> {
    return await new Promise<boolean>(async (resolve) => {
      resolve(true);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getPersistenceInfo() {
    throw new Error('Method not implemented.');
  }
  existent(input: PersistenceInputCreate | any): Promise<PersistencePromise> {
    return this.create(input);
  }
  nonexistent(
    input: PersistenceInputDelete | string
  ): Promise<PersistencePromise> {
    return this.delete(input);
  }
  correct(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return this.update(input);
  }
  create(input: PersistenceInputCreate | any): Promise<PersistencePromise> {
    // console.log(input);
    return Array.isArray(input.item)
      ? this.makePromise(input, 'createArray')
      : this.makePromise(input, 'create');
  }
  read(input: PersistenceInputRead | string): Promise<PersistencePromise> {
    // console.log('read', input);
    return typeof input === 'string' || input.id
      ? this.makePromise(input, 'readById')
      : input.single
      ? this.makePromise(input, 'read')
      : this.makePromise(input, 'readArray');
  }
  update(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return input.id
      ? this.makePromise(input, 'updateById')
      : input.single
      ? this.makePromise(input, 'update')
      : this.makePromise(input, 'updateArray');
  }
  delete(input: PersistenceInputDelete | string): Promise<PersistencePromise> {
    // console.log('FUCKING DELETE');

    return typeof input === 'string' || input.id
      ? this.makePromise(input, 'deleteById')
      : input.single
      ? this.makePromise(input, 'delete')
      : this.makePromise(input, 'deleteArray');
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  create(input: PersistenceInputCreate | any): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve, reject) => {
      const type = 'create';
      // console.log('A RECEIVED INPUT: ', input);
      // input['item'].id = input['id'];
      // console.log('RECEIVED INPUT: ', input);

      this.dAO(type, this.realInput(input))
        .then((received) => {
          const object = {
            receivedItem: received,
            result: true,
            sentItem: this.realInput(input),
          };

          // console.log('received:', object);

          resolve(new PersistencePromise(object));
        })
        .catch((error) => reject(error));
    });
  }
  nonexistent(
    input: PersistenceInputDelete | string
  ): Promise<PersistencePromise> {
    return this.delete(input);
  }
  delete(input: PersistenceInputDelete | string): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>(async (resolve, reject) => {
      const type = 'delete';
      let received;
      try {
        // if (type === 'selectById')
        received = await this.dAO(
          type,
          typeof input === 'string' ? input : input.id
        );
        // else received = await this.dAO(type);
      } catch (error) {
        reject(error);
      }

      resolve(
        new PersistencePromise({
          receivedItem:
            typeof input === 'string'
              ? received[0]
              : input.single
              ? received[0]
              : received,
          result: true,
          selectedItem: typeof input === 'string' ? input : input.id,
        })
      );
    });
  }
  correct(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return this.update(input);
  }
  update(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>(async (resolve, reject) => {
      const type = 'update';
      let received;
      try {
        received = await this.dAO(type, input.id, input.item);
      } catch (error) {
        reject(error);
      }
      resolve(
        new PersistencePromise({
          receivedItem: input.single ? received[0] : received,
          result: true,
          selectedItem: input.id,
          sentItem: input.item,
        })
      );
    });
  }
  read(input: PersistenceInputRead | string): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>(async (resolve, reject) => {
      const type: string =
        typeof input === 'string' || input.id ? 'readById' : 'readAll';
      let received;
      try {
        if (type === 'readById')
          received = await this.dAO(
            type,
            typeof input === 'string' ? input : input.id
          );
        else received = await this.dAO(type);
      } catch (error) {
        reject(error);
      }

      resolve(
        new PersistencePromise({
          receivedItem:
            typeof input === 'string'
              ? received[0]
              : input.single
              ? received[0]
              : received,
          result: true,
          selectedItem: typeof input === 'string' ? input : input.id,
        })
      );
    });
  }
}

import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';
import {
  Handler,
  Event,
  Operation,
  MongoDB,
  PersistencePromise,
} from 'flexiblepersistence';
import { database, eventDatabase } from './databases';
import TestService from './testService';
import TestDAO from './testDAO';
import { Pool } from 'pg';
// import { DAODB } from '@flexiblepersistence/dao';
import { ServiceHandler } from '@flexiblepersistence/service';

class Test {
  constructor(id?) {
    this.id = id;
  }
  public id: string | undefined;
}

test('store person, update, select all, select by id person and delete it', async (done) => {
  const pool = new Pool(database);
  try {
    new TestService(database);
    new TestDAO({ ...database, pool });

    const read = new ServiceHandler(database);
    const write = new MongoDB(eventDatabase);

    await Utils.init(pool);

    const handler = new Handler(write, read);
    await handler.getWrite().clear('events');

    const sentPerson = new Test();

    const createdPerson = await handler.addEvent(
      new Event({ operation: Operation.create, content: sentPerson })
    );
    // console.log('createdPerson:', createdPerson);
    sentPerson.id = createdPerson.receivedItem.id;
    const expectedPerson = { id: createdPerson.receivedItem.id };
    // console.log('expectedPerson:', expectedPerson);
    expect(createdPerson).toStrictEqual(
      new PersistencePromise({
        receivedItem: expectedPerson,
        result: true,
        selectedItem: undefined,
        sentItem: sentPerson,
      })
    );
    // const all = (
    //   await journaly.publish('TestService.read')
    // )[0];

    // expect(all).toStrictEqual([expectedPerson]);
    // const one = (
    //   await journaly
    //     .publish('TestService.selectById', createdPerson.id)
    // )[0];

    // expect(one).toStrictEqual(expectedPerson);
  } catch (error) {
    console.error(error);
    await Utils.end(pool);
    expect(error).toBe(null);
    done();
  }
  await Utils.end(pool);
  done();
});

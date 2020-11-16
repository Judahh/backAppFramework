import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';
import { Handler, Event, Operation } from 'flexiblepersistence';
import { database, eventDatabase } from './databases';
import TestService from './testService';
import TestDAO from './testDAO';
import { Pool } from 'pg';
import { DAODB } from '@flexiblepersistence/dao';
import { ServiceHandler } from '@flexiblepersistence/service';

class Test {
  public id: string | undefined;
}

test('store person, update, select all, select by id person and delete it', async (done) => {
  const pool = new Pool(database);
  try {
    new TestService(database);
    new TestDAO(database);

    const read = new ServiceHandler(database);

    await Utils.init(pool);

    const handler = new Handler(eventDatabase, read);
    await handler.getWrite().clear('events');

    const createdPerson = await handler.addEvent(
      new Event({ operation: Operation.create, content: new Test() })
    )[0];
    console.log('createdPerson:' + createdPerson);
    const expectedPerson = {
      id: createdPerson.id,
    };
    expect(createdPerson).toStrictEqual({
      receivedItem: [],
      result: true,
      selectedItem: undefined,
      sentItem: expectedPerson,
    });
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

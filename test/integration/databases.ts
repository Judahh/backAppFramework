import { PersistenceInfo } from 'flexiblepersistence';
import { Journaly } from 'journaly';

import { eventInfo, readInfo } from './databaseInfos';

const journaly = Journaly.newJournaly<any>();

const eventDatabase = new PersistenceInfo(eventInfo, journaly);

const database = new PersistenceInfo(readInfo, journaly);

export { eventDatabase, database, journaly };

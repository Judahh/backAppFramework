// file deepcode ignore no-any: any needed
import { DatabaseInitializer } from '@flexiblepersistence/dao';
import { SubjectObserver } from 'journaly';

export default interface DatabaseHandlerInitializer
  extends DatabaseInitializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  journaly: SubjectObserver<any>;
}

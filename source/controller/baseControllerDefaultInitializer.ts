import { DefaultInitializer } from 'default-initializer';
import { Handler } from 'flexiblepersistence';

export default interface BaseControllerDefaultInitializer
  extends DefaultInitializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: Handler;
}

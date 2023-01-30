import { ClientSession } from 'mongoose';
export interface ITransactionRepository {
  sessionInstance: ClientSession | null;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  abortTransaction(): Promise<void>;
}

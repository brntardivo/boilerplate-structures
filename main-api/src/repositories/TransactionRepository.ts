import { ITransactionRepository } from '@repositories/ITransactionRepository';
import { ClientSession, startSession } from 'mongoose';

export class TransactionRepository implements ITransactionRepository {
  public sessionInstance: ClientSession | null = null;

  async startTransaction(): Promise<void> {
    this.sessionInstance = await startSession();
    this.sessionInstance.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this.sessionInstance?.commitTransaction();
    this.sessionInstance?.endSession();
  }

  async abortTransaction(): Promise<void> {
    await this.sessionInstance?.abortTransaction();
    this.sessionInstance?.endSession();
  }
}

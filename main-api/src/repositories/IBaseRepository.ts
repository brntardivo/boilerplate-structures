export interface IBaseRepository<T> {
  exists(t: T): Promise<boolean>;
  delete?(t: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  save(t: T): Promise<T | null>;
}

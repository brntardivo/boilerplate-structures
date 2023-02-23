export interface IBaseRepository<T> {
  exists(t: T): Promise<boolean>;
  delete?(t: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  create(t: T): Promise<T | null>;
  update(t: T): Promise<T | null>;
}

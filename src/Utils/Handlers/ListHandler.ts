export default class ListHandler<T> {
  data: T[] = [];
  meta?:
    | {
        totalCount: number;
        pageCount: number;
        currentPage: number;
        perPage: number;
      }
    | undefined;

  constructor(list: ListHandler<T>) {
    this.data = list.data;
    this.meta = list.meta;
  }

  static handle<U>(list: ListHandler<U>, Model: { create: (values: any) => U }): ListHandler<U> {
    if (!Model.create) throw new Error('Entities that are using ListHandler facade must have static create method');
    return new ListHandler<U>({ ...list, data: list.data?.map(item => Model.create(item)) });
  }

}

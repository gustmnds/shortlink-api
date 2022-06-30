/* eslint-disable no-empty-function, no-useless-constructor, no-unused-vars */
export class List<T> {
  constructor(
    public data: Array<T>,
    public page: number,
    public total: number,
    public count: number,
    public pages: number,
  ) {}
}

export interface IIdentifiable {
  getId: () => string

  setId(id?: undefined): this
  setId(id: string): this
  setId(id: string | undefined): this
}

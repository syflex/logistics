import ObjectId from 'bson-objectid'

export interface IIdentifiable {
  getId: () => ObjectId

  setId(id?: undefined): this
  setId(id: string): this
  setId(id: ObjectId): this
  setId(id: ObjectId | string | undefined): this
}

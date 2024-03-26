import ObjectId from 'bson-objectid'
import { IIdentifiable } from './IIdentifiable.js'
import { ISerializable } from './ISerializable.js'

export abstract class Entity implements IIdentifiable, ISerializable {
  protected id: ObjectId

  constructor() {
    this.id = new ObjectId()
  }

  getId() {
    return this.id
  }

  setId(id?: undefined): this
  setId(id: string): this
  setId(id: ObjectId): this
  setId(id: ObjectId | string | undefined): this {
    if (typeof id === 'string') {
      id = new ObjectId(id)
    }

    if (id === undefined) {
      id = new ObjectId()
    }

    this.id = id
    return this
  }

  toJson(): Record<string, any> {
    throw new Error('Method not implemented.')
  }
}

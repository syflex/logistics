import { IIdentifiable } from './IIdentifiable.js'
import { ISerializable } from './ISerializable.js'
import { monotonicFactory } from 'ulid'
const ulid = monotonicFactory()

export abstract class Entity implements IIdentifiable, ISerializable {
  protected id: string

  constructor() {
    this.id = ulid()
  }

  getId() {
    return this.id
  }

  setId(id?: undefined): this
  setId(id: string): this
  setId(id: string | undefined): this {
    if (typeof id === 'string') {
      id = id
    }

    if (id === undefined) {
      id = ulid()
    }

    this.id = id
    return this
  }

  toJson(): Record<string, any> {
    throw new Error('Method not implemented.')
  }
}

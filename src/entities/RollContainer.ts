import { Entity } from './Entity'

export type locationType = {
  rollContainerId: string
  latitude: string
  longitude: string
}

export type scanningType = {
  rollContainerId: string
  isNoteEmpty: string
  destination: string
}

export type rollContainerType = locationType & scanningType

export class RollContainer extends Entity {
    private rollContainerId: string
    private latitude: string = '';
    private longitude: string = '';
    private isNoteEmpty: string = '';
    private destination: string = '';

    constructor(rollContainerId: string) {
        super()
        this.rollContainerId = rollContainerId
    }

  static create(rollContainerData: rollContainerType) {
    const locationEntity = new RollContainer(rollContainerData.rollContainerId)
    locationEntity.setLatitude(rollContainerData.latitude)
    locationEntity.setLongitude(rollContainerData.longitude)
    locationEntity.setIsNoteEmpty(rollContainerData.isNoteEmpty)
    locationEntity.setDestination(rollContainerData.destination)
    return locationEntity
  }

  setRollContainerId(rollContainerId: string) {
    this.rollContainerId = rollContainerId
    return this
  }

  setLatitude(latitude: string) {
    this.latitude = latitude
    return this
  }

  setLongitude(longitude: string) {
    this.longitude = longitude
    return this
  }

  setIsNoteEmpty(isNoteEmpty: string) {
    this.isNoteEmpty = isNoteEmpty
    return this
  }

  setDestination(destination: string) {
    this.destination = destination
    return this
  }

  toLocationJson() {
      return {
          rollContainerId: this.rollContainerId,
          latitude: this.latitude,
          longitude: this.longitude
      }
  }

  toScanningJson() {
      return {
          rollContainerId: this.rollContainerId,
          isNoteEmpty: this.isNoteEmpty,
          destination: this.destination
      }
  }

  toJson() {
      return {
          rollContainerId: this.rollContainerId,
          latitude: this.latitude,
          longitude: this.longitude,
          isNoteEmpty: this.isNoteEmpty,
          destination: this.destination
      }
  }

  toALlJson(): rollContainerType[] {
      return [
          {
              rollContainerId: this.rollContainerId,
              latitude: this.latitude,
              longitude: this.longitude,
              isNoteEmpty: this.isNoteEmpty,
              destination: this.destination
          }
      ]
    }
}

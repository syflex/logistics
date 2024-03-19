import { Schema } from 'redis-om'

export const RollContainerObservationSchema = new Schema('RollContainerObservation', {
    rollContainerId: { type: 'string'},
    latitude: { type: 'string' },
    longitude: { type: 'string' },
    isNoteEmpty: { type: 'string' },
    destination: { type: 'string' },
}, {
    dataStructure: 'JSON'
})
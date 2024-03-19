import { Schema } from 'redis-om'

export const DistributionDepotSchema = new Schema('DistributionDepot', {
  depotId: { type: 'string'},
  name: { type: 'string' },
  dailyCapacity: { type: 'string' },
  lastUpdated: { type: 'string' },
  date: { type: 'string', path: '$.weeklyCapacity.date' },
  capacity: { type: 'string', path: '$.weeklyCapacity.capacity' },
}, {
  dataStructure: 'JSON'
})
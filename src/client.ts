import { createClient } from 'redis'
const url = ''
const redis = createClient({
    url: url
})

redis.on('error', (err) => console.log('Redis Client Error', err));

export default redis

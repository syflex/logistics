import { createClient } from 'redis'
const url = 'redis://default:2&Y>~F-h+_:Avc}@redis-10321.c10.us-east-1-4.ec2.cloud.redislabs.com:10321'
const redis = createClient({
    url: url
})

redis.on('error', (err) => console.log('Redis Client Error', err));

export default redis
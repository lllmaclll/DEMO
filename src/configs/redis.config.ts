import { RedisClientType, createClient } from "redis";

export let redisConn: RedisClientType

export const initRedis = async (): Promise<RedisClientType> => {
    redisConn = createClient({
        url: "redis://thanespgm.com:6378",
        // password: "@Thanes1234"
    })
    redisConn.on('error', error => console.log('Redis Client Error', error))
    await redisConn.connect()
    await redisConn.flushAll()
    return redisConn
}
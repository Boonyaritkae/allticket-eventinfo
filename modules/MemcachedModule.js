'use strict';
require('dotenv').config();
const Memcached = require('memcached-elasticache');
const memcached = new Memcached(process.env.URL_MEMCACHED, {
    retries: 10,
    retry: 10000,
    remove: true,
    timeout: 5000
});

module.exports = class MemcachedModule {

    constructor() {
        this.memcachedKey = '';
    }
    async getDataMemcached(key = null) {
        let cache = '';
        try {
            if (key == null) throw new Error("key is require");
            cache = await this.invokeMemcached(key);
            return (cache) ? cache : null;
        } catch (e) {
            throw e;
        }
    }

    invokeMemcached(key = null) {
        return new Promise((resolve, reject) => {
            memcached.get(key, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }
}
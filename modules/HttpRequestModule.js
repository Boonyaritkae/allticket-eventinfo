'use strict';
const axios = require('axios'),
    qs = require('qs'),
    MemcachedModule = require('./MemcachedModule');

module.exports = class HttpRequest extends MemcachedModule {

    constructor() {
        super();
        this.options = {},
            this.options.headers = {
                "ContextType": "application/x-www-form-urlencoded"
            }
        this.options.responseType = "json";
    }

    addHeader(key, data) {
        this.options.headers[key] = data;
    }

    createHttp(url = '', data = {}) {
        this.options.url = url,
            this.options.data = qs.stringify(data);
        return this;
    }

    async post() {
        try {
            this.options.method = 'post';
            return await axios(this.options);
        } catch (e) {
            throw e;
        }
    }

    async get() {
        try {
            return await axios.get(this.options.url);
        } catch (e) {
            throw e;
        }
    }
}

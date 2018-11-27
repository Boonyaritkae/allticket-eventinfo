'use strict'
const HttpRequestModule = require('../modules/HttpRequestModule'),
      axios = require("axios") ,
      qs = require('qs') ;
      require("dotenv").config();

module.exports = class EventInfoService extends HttpRequestModule {

  constructor(performId = '') {
    super();
    this.performId = performId;
    this.memcachedKey = `EVENTINFO[id:${ this.performId}]`;
  }

  async getEventInfo() {
    let resp = null;
    try {
      resp = await this.getDataMemcached(this.memcachedKey);
      if (resp == null) {
        resp = await this.createHttp(process.env.URL_EVENT_TICKET, {
          performId: this.performId
        }).post();
        return resp.data.code == 100 ? resp.data.data : null;
      }
      return JSON.parse(resp);
    } catch (e) {
      throw e;
    }
  }

}

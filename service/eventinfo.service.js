'use strict'
const HttpRequestModule = require('../modules/HttpRequestModule');

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
        resp = await this.createHttp(process.env.URL_EVENT_INFO, {
          performId: this.performId
        }).post();
        return resp.data.code == 100 ? resp.data.data : null;
      }
      return JSON.stringify(resp);
    } catch (e) {
      throw e;
    }
  }

}

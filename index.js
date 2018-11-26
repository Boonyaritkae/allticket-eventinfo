'use strict';
const HttpRequestModule = require('./modules/HttpRequestModule'),
      MemchachedModule = require('./modules/MemcachedModule'),   
      EventInfoService = require('./service/eventinfo.service');

exports.HttpRequestModule = HttpRequestModule;
exports.MemchachedModule = MemchachedModule;
exports.EventInfoService = EventInfoService;

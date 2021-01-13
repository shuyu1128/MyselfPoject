'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST: '"/api"',
    ws_host:'"192.168.99.132:8080"',
})
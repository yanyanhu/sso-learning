'use strict';

const axios = require('axios');
const qs = require('qs');

var globalToken;

async function getPassword() {
    try {
        const instance = axios.create({
	    baseURL: 'http://$SSO_SERVER_IP:8080/',
            timeout: 1000
        });
        const data = qs.stringify({
            username: 'demo-frontend-user',
            //username: 'external-service-01',
            password: '$PASSWORD',
            client_id: 'demo-backend-service',
            client_secret: '$CLIENT-SECRET',
            grant_type: 'password'
        })

        const hearders = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        var result = await instance.post(
            '/auth/realms/demo/protocol/openid-connect/token',
            data,
            hearders);
        globalToken = result.data.access_token;
        console.log("Getting global token successfully:" + globalToken);
    } catch (error) {
        console.log(error);
    }

}

async function requestServer() {
    try {
        const instance = axios.create({
            baseURL: 'http://$SSO_SERVER_IP:3001/',
            timeout: 1000,
            headers: { 'Authorization': `Bearer ${globalToken}` }
        });

        var result = await instance.get('/demo-frontend-api');
        //var result = await instance.get('/external-service-api');
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    await getPassword();
    // await sleep(1000);
    await requestServer();
})()

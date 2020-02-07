'use strict';

const axios = require('axios');
const qs = require('qs');

var globalToken;

async function getPassword() {
    try {
        const instance = axios.create({
            baseURL: 'http://$SSO_HOST_IP:8080/',
            timeout: 1000
        });
        const data = qs.stringify({
            username: '$USER',
            password: '$PASSWORD',
            client_id: '$CLIENT_ID',
            client_secret: 'CLIENT_SECRET',
            grant_type: 'password'
        })

        const hearders = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        var result = await instance.post(
            '/auth/realms/demo/protocol/openid-connect/token',
            data,
            hearders);
        globalToken = result.data.access_token;
        console.log(globalToken);
    } catch (error) {
        console.log(error);
    }

}

async function requestServer() {
    try {
        const instance = axios.create({
            baseURL: 'http://$SSO_HOST_IP:3000/',
            timeout: 1000,
            headers: { 'Authorization': `Bearer ${globalToken}` }
        });

        var result = await instance.get(
            '/user');
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

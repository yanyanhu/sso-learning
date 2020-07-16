# Google as IDP for Keycloak

## Create a Google Application
Go to Google APIs Portal: https://console.developers.google.com and create a new GoogleAPI app.

Then go to `Credentials` tab and click on the `Create Credentials` button and choose `OAuth Client ID`.

Select `Web application` as Application type. For the `Authorized Redirect URI`, specify your Keycloak URI(in the following format), relative to your Keycloak server and Realm. This `Authorized Redirect URI` will actually be generated after the Google IDP is created in Keycloak and can be found in the `Identity Providers` detail page. But it's format is fixed as below.

```
https://${KEYCLOAK-SERVER-PRIVATE-IP}.xip.io/auth/realms/${REALM-NAME}/broker/google/endpoint
```
or 
```
https://${KEYCLOAK-SERVER-PUB-DOMAIN-NAME}/auth/realms/${REALM-NAME}/broker/google/endpoint
```

Note: Google does not allow a private IP to be defined as `Authorized Redirect URI`. So we use `xip.io` to generate a magic domain name to pass the check. If you already have a public domain name available for your Keycloak server, this suffix can be ignored.

Now, save the change and create the crendential. The `Client ID` and `Secret` will be created and displayed. Note them down and safely keep them.

## Create Google Identity Provider in Keycloak
Go the Keycloak and the realm you want to integrate Google IDP. Go to `Identity Providers` tab and click the button of `Add provider`. Select `Google` from `Social` category, and fill in the `Client ID` and `Secret` you just got from GoogleAPI. Enable the option of `Store Tokens` and `Stored Tokens Readable` and save.

## Create a client
Under the realm, create a new Client as usual. For `Client Protocol`, select `openid-connect`.

## Setup Gatekeeper for magic domain name
Setup Gatekeeper as usual for the client just created. In case you are using magic domain name provided by `xip.io`, define the `discovery-url` in that form as well, e.g.:
```
https://${KEYCLOAK-SERVER-PRIVATE-IP}.xip.io/auth/realms/${REALM-NAME}
```

## Have a try
Bootup the gatekeeper and setup the App and have a try. Now both google account and keycloak users should be allowed to login and access your application interfaces being protected.


## Reference:

1. Adding google as IDP:
```
http://www.mastertheboss.com/jboss-frameworks/keycloak/google-social-login-with-keycloak
```

2. Addressing public domain name and private IP issue:
```
https://stackoverflow.com/questions/24736168/error-invalid-request-device-id-and-device-name-are-required-for-private-ip
```

A quick introduction on how to use keycloak and gatekeeper.

## Basic Setup
### Bootup Keycloak Server
First modify docker-compose.yml to configure the init admin user name and password.

Then perform the following cmd to bootup the keycloak server:
```
./startKeyCloak.sh
```

### Login
In your browser, enter `http://KEYCLOAK_SERVER_IP:8080/auth` to access the main auth page and key in the admin user name and password to enter the master real management page.

### Create A New Realm
Create a new Realm called `demo` (or cusomize your own realm name). A **realm** can represent a project which could include multiple services.


## Example Frontend Setup
### Create A New Client for Demo Frontend Service
Create a new client named `demo-frontend-service`:
- Create a new client by clicking `Create` button under `Configure.Clients` menu;
- Under `Settings` tab, change Access Type to `confidential` from default `public`;
- Under `Settings` tab, config a valid root url(e.g. `http://HOST_IP/` and a redirect uris (e.g. `/*`);
- Click the `save` button to save the change.

### Create New Roles
Under `Roles` tab of `demo-frontend-service` client, create two new roles: `admin` and `member`.

### Create New Users
Under `Manage.Users` tab of `demo-frontend-service` client, click `Add user` to create two new users: `demo-admin-01` and `demo-user-01`. For the `demo-admin-01` user, assign the role of `admin` of the `demo-frontend-service` client. For the `demo-user-01` user, assign the role of `member` of the `demo-frontend-service` client.

### Create Audience Mapper
Under `Mappers` tab of `demo-frontend-service` client, create a new mapper of `Audience` as type.

### Config Gatekeeper for Demo Frontend Service
Under `Installation` tab of `demo-frontend-service` client, choose JSON Format Option, record secret and fill it into the `gatekeeper/config.yml`. Also config the correct `$SSO_SERVER_IP`.

### Boot Up Gatekeeper for Demo Frontend Service
Running the following cmd to boot up gatekeeper:
```
./startGateKeeper.sh
```

### Start Example Frontend Server
Run the following cmd to start example frontend server in `app/index.js`:
```
node app/index.js
```

### Test
Open the browser and access the following page:
```
<GatekeeperIP>:3000/admin
```
If login as the `demo-admin-01` user, the success response will be shown in the web page. If login as the `demo-user-01` user, the permission deny response will be shown in the web page.

Open the browser and access the following page:
```
<GatekeeperIP>:3000/member
```
Login as either the `demo-admin-01` user or the `demo-user-01` user, the  success response will be shown in the web page.


## Example Backend Setup
### Create A New Client for Demo Backend Service
Create a new client named `demo-backend-service`:
- Create a new client by clicking `Create` button under `Configure.Clients` menu;
- Under `Settings` tab, change Access Type to `confidential` from default `public`;
- Under `Settings` tab, config a valid root url(e.g. `http://HOST_IP/` and a redirect uris (e.g. `/*`);
- Click the `save` button to save the change.

### Create New Roles
Under `Roles` tab of `demo-backend-service` client, create two new roles: `demo-frontend-role` and `other-external-services-role`.

### Create New Users
Under `Manage.Users` tab of the `demo-backend-service` client, click `Add user` to create two new users: `demo-frontend-user`(a user represents the frontend service itself) and `external-service-01`(a user represent another external service who wants to access demo-backend-service). For the `demo-frontend-user`, assign the role of `demo-frontend-role` of `demo-frontend-service` client. For the `external-service-01` user, assign the role of `other-external-services-role` of the `demo-backend-service` client.

### Create Audience Mapper
Under `Mappers` tab of `demo-backend-service` client, create a new mapper of `Audience` as type.

### Config Gatekeeper for Demo Backend Service
Under `Installation` tab of `demo-backend-service` client, choose JSON Format Option, record the secret and update it into `gatekeeper/config-02.yml`. Also config the correct `$SSO_SERVER_IP`.

### Boot Up Gatekeeper for Demo Backend Service
Running the following cmd to boot up gatekeeper:
```
./startGateKeeper-02.sh
```

### Start Example Backend Server
Run the following cmd to start example backend server in `app-02/index.js`:
```
node app-02/index.js
```

### Test
Editing the `client/index.js` file to update the username, password, client-id and secret which is required to get the access token. Then run
```
node client/index.js
```
The success message will be shown if correct user is used for accessing specific api interface.


## Additional Scopes Configuration and Test[WIP]


## To Add Init Admin User Using Script
```
docker exec <CONTAINER> /opt/jboss/keycloak/bin/add-user-keycloak.sh -u <USERNAME> -p <PASSWORD>
```
Then restarting the container:
```
docker restart <CONTAINER>
```
Refer to https://hub.docker.com/r/jboss/keycloak/ to get more information.


## IDPs
1. [Google social login](./idps/google-social-login-with-keycloak.md)


A quick introduction on how to use keycloak and gatekeeper.

## How to start
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

### Create A New Client
Create a new client named `demo-service`:
- Create a new client by clicking `Create` button under `Configure.Clients` menu;
- Under `Settings` tab, change Access Type to `confidential` from default `public`;
- Under `Settings` tab, config a valid root url(e.g. `http://HOST_IP/` and a redirect uris (e.g. `/*`);
- Click the `save` button to save the change.

### Create New Roles
Under `Roles` tab of `demo-service` client, create two new roles: `admin` and `member`.

### Create New Users
Under `Manage.Users` tab of `demo-service` client, click `Add user` to create two new users: `demo-admin` and `demo-user-01`. For `demo-admin`, assign the role of `admin` and `member` of `demo-service` client. For `demo-user-01`, assign the role of `member` of `demo-service` client.

### Create Audience Mapper
Under `Mappers` tab of `demo-service` client, create a new mapper of `Audience` as type.

### Config Gatekeeper
Under `Installation` tab of `demo-service` client, choose JSON Format Option, record secret and fill it into `keycloak.json` and `gatekeeper/config-default-scope.yml`. Also config the correct `$SSO_SERVER_IP` in `gatekeeper/config-default-scope.yml` and use it to override `gatekeeper/config.yml`.

### Boot Up Gatekeeper
Running the following cmd to boot up gatekeeper:
```
./startGateKeeper.sh
```

## Start Example App Server
### Choice 1: Node.js express server + gatekeeper
1. Run app/index.js
2. Run startGateKeeper.sh

### Choice 2: Node.js express server with adapter
Run app/index_with_adapter.js


## How to Test[WIP]
1. request on `<yourOwnIP>:3000/admin`
2. request on `<yourOwnIP>:3000/user`


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


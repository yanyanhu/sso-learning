# sso_learning
A quick start

## How to use
### Prepare: Keycloack instance
1. Modify docker-compose.yml for keycloak user and password
2. Run startKeyCloak.sh
3. In your browser, enter http://localhost:8080/auth
4. [Create Realm] Create a new Realm called `"demo"` (or cusomize your own realm name)
5. [Create Client] Create a new Client called `"vanilla"` (or cusomize your own client name)
6. [Edit Client] Under settings tab, enable authorization
7. [Edit Client] Under settings tab, config valid redirect uris (with you own IP address)
8. [Edit Client] Under roles tab, create two roles, one called `"admin"`, another called `"user"`
9. [Edit Client] Under installation tab, choose JSON Format Option, record secret and fill it into `keycloak.json` and `gatekeeper/config.yml`
10. [Edit Client] Under service account roles tab, under client roles, enable both `"admin"` and `"user"`
11. [Create Users] Create user
12. [Edit Users] Under Role Mappings tab, under client roles, enable both `"admin"` and `"user"`
13. [Create Client Scope] Create a client scope named `"good-service"` (or cusomize your own scope name), record this name to `gatekeeper/config.yml`
14. [Edit Client Scope] Under mappers tab, create new mapper with `"Audience"` as type
15. [Edit Client] Under Client Scopes tab, add `"good-service"` to assigned scope
16. Modify IPs in `gatekeeper/config.yml` to your own IP address

### Start your logic server
#### Choice 1: Node.js express server with adapter
Run app/index_with_adapter.js

#### Choice 2: Node.js express server + gatekeeper
1. Run app/index.js
2. Run startGateKeeper.sh

## How to request
1. request on `<yourOwnIP>:3000/admin`
2. request on `<yourOwnIP>:3000/user`

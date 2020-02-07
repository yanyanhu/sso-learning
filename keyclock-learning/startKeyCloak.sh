set -e

docker-compose -f ./docker-compose.yml up -d keycloak

# Access keycloak master realm through the following URL:
#     - https://$HOST/auth/admin/master/console/#/realms/master

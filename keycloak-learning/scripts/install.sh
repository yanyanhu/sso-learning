#!/bin/bash
#
# This script prepares basic environment and runs keycloak server.
#

# Install Docker
echo "========    Install Docker    ========"
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
docker info

# Install docker-compose
echo "========    Install docker-compose    ========"
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Pull docker images of postgres and keycloak
echo "========    Pull docker images of postgres, keycloak and gatekeeper    ========"
docker pull postgres
docker pull jboss/keycloak
docker pull keycloak/keycloak-gatekeeper

# Run postgres DB
echo "========    Start postgres DB    ========"
mkdir -p ../postgres-data/
./startPostgres.sh

echo "======== sleep 10s ========"
sleep 10

# Run keycloak server
echo "========    Start keycloak server    ========"
./startKeyCloak.sh

echo "========    done    ========"

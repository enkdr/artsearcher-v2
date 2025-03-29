# Define variables

FRONTEND_DIR=~/development/react-dev/artsearcher-v2/

PUBLIC_DIR=~/development/react-dev/artsearcher-v2/dist/
DEST_DIR=/var/www/artsearcher/pb_public/

SERVER_USER=root
SERVER_IP=5.223.43.47
REMOTE_USER=goapp
SERVICE_NAME=artsearcher

COLOUR_BLUE=\033[0;34m
COLOUR_RED=\033[0;31m
COLOUR_END=\033[0m


push:
	rsync -avz --delete $(PUBLIC_DIR)/ $(SERVER_USER)@$(SERVER_IP):$(DEST_DIR)
	ssh $(SERVER_USER)@$(SERVER_IP) 'chown -R $(REMOTE_USER):$(REMOTE_USER) $(DEST_DIR) && chmod -R 0755 $(DEST_DIR)'

deploy:
	@echo "$(COLOUR_BLUE)You are about to deploy front-end to production - are you sure? (y/n)$(COLOUR_END)"
	@read answer && [ "$$answer" = "y" ]
	cd $(FRONTEND_DIR) && npm run build
	$(MAKE) push


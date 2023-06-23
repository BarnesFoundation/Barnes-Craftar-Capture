# Compiles the application and installs production node_modules
builds:
	# 1. Compiles the src and server directory and outputs them to dist
	npm run build

	# 2. Rename the development node_modules
	mv node_modules dev_node_modules

	# 3. Install the production node_modules
	npm ci --production

# Removes the production node_modules and undoes the rename of development node_modules
reset_node:
	rm -rf node_modules
	mv dev_node_modules node_modules

prod:
	npm run deploy:prod

dev: 
	npm run deploy:dev

# Deploy to development
deploy_dev: builds dev reset_node

# Deploy to production
deploy_prod: builds prod reset_node


######################################
#
# Make commands for local development
#
######################################

# Starts a local ngrok tunnel
# connected to the React FE on localhost:3006
# Ngrok had recent breaking changes in new releases, so hardcode old version until we upgrade
ngrok-client:
	npx ngrok@4.3.0 http 3004 --host-header=localhost:3004

# Starts a local ngrok tunnel
# connected to the Node BE on localhost:4006
# Ngrok had recent breaking changes in new releases, so hardcode old version until we upgrade
ngrok-server:
	npx ngrok@4.3.0 http 4004 --host-header=localhost:4004
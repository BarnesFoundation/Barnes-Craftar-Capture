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

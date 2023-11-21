# mod-updater
updates mods hosted on git servers.
- will check if repository is clean (if you make any modifications and do not commit it will not try to update your repo)
- will do git pull

## how to:
- `npm install` download node modules
- `node {diseredpath}/index.js {basepathwheremodsare}` runs the application
  - **diseredpath**: where the application is located
  - **basepathwheremodsare**: where the mods are downloaded

ps1*: if no **basepathwheremodsare** is passed, the default directory is where the command is running. 
ps2*: Since this app runs on downloaded git repos you probably now how this works alredy. If not, check how to [download and run node](https://nodejs.org)

# Change Log
All notable changes to the "vscode-ngrok-helper" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added
- Initial release
- Supports start, stop and viewing the ngrok tunnel
- Initial configuration options: 
  - `ngrok.port`: Configures the port you want to forward
  - `ngrok.subdomain`: Optional subdomain that you want to specify
  - `ngrok.config`: Object of other command-line flags you want to pass
  - `ngrok.showOnStart`: Shows the terminal when started
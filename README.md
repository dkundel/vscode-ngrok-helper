# vscode-ngrok-helper README

This is the README for your extension "vscode-ngrok-helper". After writing up a brief description, we recommend including the following sections.

## Features



## Requirements

This tool requires [`ngrok`](https://ngrok.com) to be installed on your computer and available in the path that is used for your VS Code integrated terminals.

> You can test this by opening a new integrated Terminal in Code and then run `ngrok --version`. If it outputs a version you are good to go.

## Extension Settings

This extension contributes the following settings:

* `ngrok.port`: the port that should be forwarded by `ngrok`
* `ngrok.subdomain`: an _optional_ subdomain that should be used rather than a random one (requires a premium `ngrok` account)
* `ngrok.config`: object of different configuration values that should be passed as command-line flags
* `ngrok.showOnStart`: shows the integrated terminal that is being spawned when you start `ngrok`

## Contributors

* [Dominik Kundel](https://github.com/dkundel)
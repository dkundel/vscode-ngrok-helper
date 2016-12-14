'use strict';

import { 
    commands,
    ExtensionContext,
    Terminal,
    StatusBarAlignment,
    StatusBarItem,
    window,
} from 'vscode';

import { 
    EXT,
    ExtensionConfig,
    getConfig,
} from './config'

let terminalInstance: Terminal;
let statusBar: StatusBarItem;
let config: ExtensionConfig;

export function activate(context: ExtensionContext) {
    let subs = context.subscriptions;

    config = getConfig();
    
    subs.push(commands.registerCommand(`${EXT}.start`, startNgrok));
    subs.push(commands.registerCommand(`${EXT}.show`, showNgrok));
    subs.push(commands.registerCommand(`${EXT}.stop`, stopNgrok));
}

// this method is called when your extension is deactivated
export function deactivate() {
    stopNgrok();
}

function startNgrok() {
    if (terminalInstance) {
        window.showInformationMessage('ngrok is already running.')
        terminalInstance.show();
        return;
    }
    
    config = getConfig();

    if (!config.port) {
        window.showInputBox({
            prompt: 'Which port should ngrok tunnel?',
            validateInput: valueIsNumber
        }).then(port => {
            if (port) {
                config.port = parseInt(port, 10);
                bootupNgrok();
            }
        }, rejectReason => {
            window.showErrorMessage(rejectReason)
        });
    } else {
        bootupNgrok();
    }
}


function showNgrok() {
    if (terminalInstance) {
        terminalInstance.show();
    }
}

function stopNgrok() {
    if (terminalInstance) {
        terminalInstance.dispose();
        terminalInstance = null;
    }

    if (statusBar) {
        statusBar.dispose();
        statusBar = null;
    }
}

function bootupNgrok() {
    terminalInstance = window.createTerminal('ngrok Terminal');
    terminalInstance.sendText(generateNgrokCommand());

    if (config.showOnStart) {
        terminalInstance.show();
    }

    statusBar = window.createStatusBarItem(StatusBarAlignment.Right);
    statusBar.text = '$(telescope) ngrok Running';
    statusBar.command = `${EXT}.show`;
    statusBar.show();
}

function generateNgrokCommand(): string {
    let cmd = 'ngrok http';
    if (config.subdomain) {
        cmd += ` --subdomain=${config.subdomain}`
    }

    let otherArgs = Object.keys(config.config);
    for (let arg of otherArgs) {
        cmd += ` --${arg}=${config.config[arg]}`;
    }

    cmd += ` ${config.port}`;
    return cmd;
}

function valueIsNumber(input: string): string {
    let p = parseInt(input, 10);
    return isNaN(p) ? 'This value has to be a number' : undefined;
}
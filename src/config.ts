import { workspace } from 'vscode';

export const EXT = 'ngrok';

export interface ExtensionConfig {
  port: number | null;
  subdomain?: string;
  config?: Object;
  showOnStart?: boolean;
}

export function getConfig(): ExtensionConfig {
  const config = workspace.getConfiguration();

  return {
    port: config.get(`${EXT}.port`, null),
    subdomain: config.get(`${EXT}.subdomain`, undefined),
    config: config.get(`${EXT}.config`, {}),
    showOnStart: config.get(`${EXT}.showOnStart`, false)
  }
}
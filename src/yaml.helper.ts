import { parse, stringify } from 'yaml';
import { readFileSync } from 'node:fs';
import * as fs from 'node:fs';
import { Package } from './type';

export function readYaml(filePath: string): any {
    return parse(fs.readFileSync(filePath, 'utf-8'));
}

export function selectEnv(config: any, branch: string): any {
    return config?.branch[branch];
}

export function parseYamlConfig(yamlConfig: string, branch: string, changeApps: Package[]): any {
    const config = readYaml(yamlConfig);
    let envName = selectEnv(config, branch);
    if (!envName) {
        throw new Error(`Branch ${branch} not found in yaml config`);
    }
    let globalEnv = config.global?.[envName];
    let apps = config.apps;
    let newApps = [];
    for (let app of apps) {
        if (app.environment === envName && changeApps.find((changeApp) => changeApp.name === app.name)) {
            newApps.push({ ...globalEnv, ...app });
        }
    }
    return newApps;
}

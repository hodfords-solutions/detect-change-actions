import { Package } from './type';

export function addEnvironmentName(config: any, changedApp: Package[]): any {
    let branches = config.mapBranches.split(' ');
    let mapBranches: any = {};
    for (let branch of branches) {
        let [app, env] = branch.split(':');
        mapBranches[app] = env
    }

    for (let app of changedApp) {
        app.environment = mapBranches[config.currentBranch] ?? 'no-environment';
    }
    return changedApp;
}

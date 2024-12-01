import { Config, Package, PackageTree } from './type';

export function getOutput(config: Config, packageTree: PackageTree) {
    const changedApp = getAppChanged(config, packageTree);
    const changedDependencies = getChangedDependencies(config, packageTree);

    return {
        changedApp,
        changedDependencies
    }
}

function getAppChanged(config: Config, packageTree: PackageTree) {
    const changedApp: Package[] = [];
    for (let app of config.apps) {
        for (let pkg of packageTree[app]) {
            if (pkg.isChanged) {
                changedApp.push(pkg);
            }
        }
    }

    return changedApp;
}

function getChangedDependencies(config: Config, packageTree: PackageTree) {
    const changedDependencies: Package[] = [];
    for (let dependency of config.dependencies) {
        for (let pkg of packageTree[dependency]) {
            if (pkg.isChanged) {
                changedDependencies.push(pkg);
            }
        }
    }

    return changedDependencies;
}

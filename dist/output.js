"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutput = getOutput;
function getOutput(config, packageTree) {
    const changedApp = getAppChanged(config, packageTree);
    const changedDependencies = getChangedDependencies(config, packageTree);
    return {
        changedApp,
        changedDependencies
    };
}
function getAppChanged(config, packageTree) {
    const changedApp = [];
    for (let app of config.apps) {
        for (let pkg of packageTree[app]) {
            if (pkg.isChanged) {
                changedApp.push(pkg);
            }
        }
    }
    return changedApp;
}
function getChangedDependencies(config, packageTree) {
    const changedDependencies = [];
    for (let dependency of config.dependencies) {
        for (let pkg of packageTree[dependency]) {
            if (pkg.isChanged) {
                changedDependencies.push(pkg);
            }
        }
    }
    return changedDependencies;
}

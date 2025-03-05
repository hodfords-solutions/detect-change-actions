"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEnvironmentName = addEnvironmentName;
function addEnvironmentName(config, changedApp) {
    var _a;
    let branches = config.mapBranches.split(' ');
    let mapBranches = {};
    for (let branch of branches) {
        let [app, env] = branch.split(':');
        mapBranches[app] = env;
    }
    for (let app of changedApp) {
        app.environment = (_a = mapBranches[config.currentBranch]) !== null && _a !== void 0 ? _a : 'no-environment';
    }
    return changedApp;
}

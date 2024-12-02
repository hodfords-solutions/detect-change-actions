import { PackageTree } from './type';
import { getPackages } from './package.helper';
import { detectChange, markChanged } from './detect-change.helper';
import * as core from '@actions/core';
import { getOutput } from './output';

export async function run(): Promise<void> {
    let config = {
        apps: core.getInput('apps').split(' '),
        dependencies: core.getInput('dependencies').split(' '),
        workspacePath: core.getInput('workspacePath'),
        includePackage: core.getInput('includePackage')
    };

    let packages: PackageTree = getPackages(config);
    const changeDirs = core.getInput('changeFiles').split(' ');

    core.debug('Change files:' + core.getInput('changeFiles'));
    detectChange(packages, changeDirs);

    if (config.includePackage) {
        markChanged(packages, config.includePackage);
    }

    const output = getOutput(config, packages);
    core.setOutput('changedApps', JSON.stringify(output.changedApp));
    core.setOutput('changedDependencies', JSON.stringify(output.changedDependencies));
}

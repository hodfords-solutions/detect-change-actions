import { PackageTree } from './type';
import { getPackages } from './package.helper';
import { detectChange } from './detect-change.helper';
import * as core from '@actions/core';
import { getOutput } from './output';

export async function run(): Promise<void> {
    let config = {
        apps: core.getInput('apps').split(' '),
        dependencies: core.getInput('dependencies').split(' '),
        workspacePath: core.getInput('workspacePath')
    };

    let packages: PackageTree = getPackages(config);
    const changeDirs = [
        // './examples/apps/app1',
        './examples/libs/lib1',
        './examples/packages/pkg1'
    ];

    console.log(core.getInput('changeFiles'));
    detectChange(packages, changeDirs);

    const output = getOutput(config, packages);
    core.setOutput('changedApps', JSON.stringify(output.changedApp));
    core.setOutput('changedDependencies', JSON.stringify(output.changedDependencies));
}

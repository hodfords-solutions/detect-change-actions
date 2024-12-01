"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPackageJson = readPackageJson;
exports.getAllPackageInFolder = getAllPackageInFolder;
exports.getPackages = getPackages;
exports.setDeepDependency = setDeepDependency;
exports.getDeepDependency = getDeepDependency;
const node_fs_1 = require("node:fs");
function readPackageJson(filePath) {
    const content = (0, node_fs_1.readFileSync)(filePath, 'utf-8');
    return JSON.parse(content);
}
function getAllPackageInFolder(folderPath) {
    const projects = (0, node_fs_1.readdirSync)(folderPath);
    return projects.map((project) => {
        const packageJson = readPackageJson(`${folderPath}/${project}/package.json`);
        const dependencies = Object.assign(Object.assign({}, packageJson.dependencies), packageJson.devDependencies);
        const localDependencies = [];
        Object.keys(dependencies).forEach((name) => {
            if (dependencies[name] === 'workspace:') {
                localDependencies.push(name);
            }
        });
        return {
            name: packageJson.name,
            path: `${folderPath}/${project}`,
            dependencies: localDependencies
        };
    });
}
function getPackages(config) {
    let packages = {};
    for (const app of config.apps) {
        packages[app] = getAllPackageInFolder(`${config.workspacePath}/${app}`);
    }
    for (const dependency of config.dependencies) {
        packages[dependency] = getAllPackageInFolder(`${config.workspacePath}/${dependency}`);
    }
    setDeepDependency(packages);
    return packages;
}
function setDeepDependency(packageTree) {
    for (const key in packageTree) {
        for (const pkg of packageTree[key]) {
            for (const dependency of pkg.dependencies) {
                pkg.dependencies = [...pkg.dependencies, ...getDeepDependency(packageTree, dependency)];
            }
        }
    }
}
function getDeepDependency(packageTree, packageName) {
    let result = [];
    for (const key in packageTree) {
        for (const pkg of packageTree[key]) {
            if (pkg.name === packageName) {
                result = pkg.dependencies;
            }
        }
    }
    return result;
}

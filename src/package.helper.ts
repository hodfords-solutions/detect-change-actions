import { Config, Package, PackageJsonDetail, PackageTree } from './type';
import { readdirSync, readFileSync } from 'node:fs';

export function readPackageJson(filePath: string): PackageJsonDetail {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
}

export function getAllPackageInFolder(folderPath: string): Package[] {
    const projects = readdirSync(folderPath);
    return projects.map((project) => {
        const packageJson = readPackageJson(`${folderPath}/${project}/package.json`);
        const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
        const localDependencies: string[] = [];

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

export function getPackages(config: Config): PackageTree {
    let packages: any = {};
    for (const app of config.apps) {
        packages[app] = getAllPackageInFolder(`${config.workspacePath}/${app}`);
    }
    for (const dependency of config.dependencies) {
        packages[dependency] = getAllPackageInFolder(`${config.workspacePath}/${dependency}`);
    }
    setDeepDependency(packages);
    return packages;
}

export function setDeepDependency(packageTree: PackageTree): void {
    for (const key in packageTree) {
        for (const pkg of packageTree[key]) {
            for (const dependency of pkg.dependencies) {
                pkg.dependencies = [...pkg.dependencies, ...getDeepDependency(packageTree, dependency)];
            }
        }
    }
}

export function getDeepDependency(packageTree: PackageTree, packageName: string): string[] {
    let result: string[] = [];
    for (const key in packageTree) {
        for (const pkg of packageTree[key]) {
            if (pkg.name === packageName) {
                result = pkg.dependencies;
            }
        }
    }
    return result;
}

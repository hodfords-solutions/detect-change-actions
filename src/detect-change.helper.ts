import { PackageTree } from './type';
import path from 'node:path';

export function detectChange(packages: PackageTree, changeDirs: string[]) {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            pkg.isChanged = changeDirs.some((dir) => path.resolve(dir) == path.resolve(pkg.path));
        }
    }
    deepDetectChange(packages);
}

export function markChanged(packages: PackageTree, name: string): void {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            if (pkg.name === name || name === 'all') {
                pkg.isChanged = true;
            }
        }
    }
}

export function deepDetectChange(packages: PackageTree): void {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            for (const dependency of pkg.dependencies) {
                if (checkDependencyChange(packages, dependency)) {
                    pkg.isChanged = true;
                }
            }
        }
    }
}

export function checkDependencyChange(packages: PackageTree, packageName: string): boolean {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            if (pkg.name === packageName) {
                return pkg.isChanged || false;
            }
        }
    }
    return false;
}

import { PackageTree } from './type';

export function detectChange(packages: PackageTree, changeDirs: string[]) {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            pkg.isChanged = changeDirs.some((dir) => dir == pkg.path);
        }
    }
    deepDetectChange(packages);
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

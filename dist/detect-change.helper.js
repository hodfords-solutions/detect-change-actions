"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectChange = detectChange;
exports.deepDetectChange = deepDetectChange;
exports.checkDependencyChange = checkDependencyChange;
function detectChange(packages, changeDirs) {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            pkg.isChanged = changeDirs.some((dir) => dir == pkg.path);
        }
    }
    deepDetectChange(packages);
}
function deepDetectChange(packages) {
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
function checkDependencyChange(packages, packageName) {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            if (pkg.name === packageName) {
                return pkg.isChanged || false;
            }
        }
    }
    return false;
}

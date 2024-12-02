"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectChange = detectChange;
exports.deepDetectChange = deepDetectChange;
exports.checkDependencyChange = checkDependencyChange;
const node_path_1 = __importDefault(require("node:path"));
function detectChange(packages, changeDirs) {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            pkg.isChanged = changeDirs.some((dir) => node_path_1.default.resolve(dir) == node_path_1.default.resolve(pkg.path));
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

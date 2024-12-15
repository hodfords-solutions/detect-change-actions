"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectChange = detectChange;
exports.markChanged = markChanged;
exports.deepDetectChange = deepDetectChange;
exports.checkDependencyChange = checkDependencyChange;
const node_path_1 = __importDefault(require("node:path"));
const core = __importStar(require("@actions/core"));
function detectChange(packages, changeDirs) {
    core.debug('Deep Package:' + JSON.stringify(packages));
    for (const key in packages) {
        for (const pkg of packages[key]) {
            pkg.isChanged = changeDirs.some((dir) => node_path_1.default.resolve(dir) == node_path_1.default.resolve(pkg.path));
        }
    }
    deepDetectChange(packages);
    core.debug('After Deep Detect:' + JSON.stringify(packages));
}
function markChanged(packages, name) {
    for (const key in packages) {
        for (const pkg of packages[key]) {
            if (pkg.name === name || name === 'all') {
                pkg.isChanged = true;
            }
        }
    }
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

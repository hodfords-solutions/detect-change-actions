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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readYaml = readYaml;
exports.selectEnv = selectEnv;
exports.parseYamlConfig = parseYamlConfig;
const yaml_1 = require("yaml");
const fs = __importStar(require("node:fs"));
function readYaml(filePath) {
    return (0, yaml_1.parse)(fs.readFileSync(filePath, 'utf-8'));
}
function selectEnv(config, branch) {
    return config === null || config === void 0 ? void 0 : config.branch[branch];
}
function parseYamlConfig(yamlConfig, branch, changeApps) {
    var _a;
    const config = readYaml(yamlConfig);
    let envName = selectEnv(config, branch);
    if (!envName) {
        throw new Error(`Branch ${branch} not found in yaml config`);
    }
    let globalEnv = (_a = config.global) === null || _a === void 0 ? void 0 : _a[envName];
    let apps = config.apps;
    let newApps = [];
    for (let app of apps) {
        if (app.environment === envName && changeApps.find((changeApp) => changeApp.name === app.name)) {
            newApps.push(Object.assign(Object.assign({}, globalEnv), app));
        }
    }
    return newApps;
}
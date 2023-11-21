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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_git_1 = require("simple-git");
const glob_1 = require("glob");
const path = __importStar(require("path"));
const basePath = "..";
const jointPath = path.posix.join(basePath, '**/.git');
console.log('search path: ' + jointPath);
(0, glob_1.glob)(jointPath, { ignore: ['node_modules/**', 'updater/.git'] })
    .then((res) => {
    res.forEach(item => {
        const dir = path.parse(item).dir;
        const git = (0, simple_git_1.simpleGit)(dir, { binary: 'git' });
        git.status((err, res) => {
            if (!err && res.isClean()) {
                git.pull((pullErr, callStatus) => {
                    console.log('updated ' + dir);
                    console.log(callStatus.summary);
                });
            }
        });
    });
});

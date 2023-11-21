"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_git_1 = require("simple-git");
var glob_1 = require("glob");
var path = require("path");
var basePath = "..";
var jointPath = path.posix.join(basePath, '**/.git');
console.log('search path: ' + jointPath);
(0, glob_1.glob)(jointPath, { ignore: ['node_modules/**', 'updater/.git'] })
    .then(function (res) {
    res.forEach(function (item) {
        var dir = path.parse(item).dir;
        var git = (0, simple_git_1.simpleGit)(dir, { binary: 'git' });
        git.status(function (err, res) {
            if (!err && res.isClean()) {
                git.pull(function (pullErr, callStatus) {
                    console.log('updated ' + dir);
                    console.log(callStatus.summary);
                });
            }
        });
    });
});
//const git: SimpleGit = simpleGit('/some/path', { binary: 'git' });

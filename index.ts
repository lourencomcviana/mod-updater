import { simpleGit, SimpleGit } from 'simple-git';
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
import path = require('path');

const basePath = ".."


const jointPath = path.posix.join(basePath,'**/.git');
console.log('search path: '+jointPath)
glob(jointPath, { ignore: ['node_modules/**','updater/.git'] })
    .then((res) =>{
       
        res.forEach(item =>{
            const dir = path.parse(item).dir
            const git: SimpleGit = simpleGit(dir, { binary: 'git' });
            
            git.status((err,res) =>{
                
                if(!err && res.isClean()) {
                    git.pull((pullErr, callStatus) =>{
                        console.log('updated '+ dir);
                        console.log(callStatus.summary)
                    })
                }
            })
        })
    })

//const git: SimpleGit = simpleGit('/some/path', { binary: 'git' });


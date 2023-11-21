import { simpleGit, SimpleGit } from 'simple-git';
import { glob } from 'glob'
import * as path from 'path';



let basePath = process.cwd()
if(process.argv[2]){
    basePath = process.argv[2]
}else{
    console.log('no base path passed, default is execution path')
}


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



import { simpleGit, SimpleGit } from 'simple-git';
import { glob } from 'glob'
import * as path from 'path';



let basePath = process.cwd()
if(process.argv[2]){
    basePath = process.argv[2]
}else{
    console.log('no base path passed, default is execution path')
}

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const Reset = "\x1b[0m"
const FgMagenta = "\x1b[35m"
const FgBlack = "\x1b[30m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"



const jointPath = path.posix.join(basePath,'**/.git');
console.log(FgMagenta+'Updating files on path: '+Reset+jointPath)
glob(jointPath, { ignore: ['node_modules/**','updater/.git', '.git'] })
    .then((res) =>{
        res.forEach(item =>{
            const dir = path.parse(item).dir
            const git: SimpleGit = simpleGit(dir, { binary: 'git' });
            
            git.status((err,res) =>{
                
                if(err) {
                    console.error(err)
                }
                else if(res.isClean()) {
                    git.pull((pullErr, callStatus) =>{
                        if(pullErr){
                            
                            console.error(pullErr)
                        } else {
                            getCurrentBranch().then(branch =>{

                                let branchColor = BgGreen
                                if(branch != "main" && branch != "master"){
                                    branchColor = BgYellow
                                }
                                console.log(branchColor+'('+branch+')' +BgGreen+'updated '+ dir+Reset);
                                console.log(callStatus.summary)
                            })
                        }
                    })
                } else {
                    console.log(BgYellow+FgBlack+'is not clean '+ dir+Reset);
                }
            })

            async function getCurrentBranch() {
                const branchSummary = await git.branchLocal();
                console.log('Branch atual:', branchSummary.current);

                return branchSummary.current
            }

        })
    })


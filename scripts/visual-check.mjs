import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd();const output=path.join(root,'.qa');await mkdir(output,{recursive:true});
const preview=spawn(path.join(root,'node_modules','.bin','vite'),['preview','--host','127.0.0.1','--port','4173'],{cwd:root,stdio:['ignore','pipe','pipe']});
const waitForServer=async()=>{for(let i=0;i<40;i++){try{const response=await fetch('http://127.0.0.1:4173/');if(response.ok)return}catch{void 0}await new Promise(resolve=>setTimeout(resolve,250))}throw new Error('Preview server did not start')};
const allShots=[['after-home-desktop.png','1440,1200','/'],['after-home-mobile.png','375,1000','/'],['after-services.png','1440,1000','/services'],['after-industries.png','1440,1000','/industries'],['after-work-desktop.png','1440,1200','/work'],['after-case-study.png','1440,1000','/work/project-01'],['after-about.png','1440,1000','/about'],['after-insights.png','1440,1000','/insights'],['after-article.png','1440,1000','/insights/choosing-the-right-system'],['after-join.png','1440,1000','/join'],['after-form-mobile.png','390,1000','/start-a-project']];
const breakpointShots=[['after-home-320.png','320,900','/'],['after-home-768.png','768,1000','/'],['after-home-1024.png','1024,1000','/'],['after-home-1920.png','1920,1200','/']];
const shots=process.argv[2]==='secondary'?allShots.slice(6):process.argv[2]==='breakpoints'?breakpointShots:process.argv[2]==='small'?breakpointShots.slice(0,1):allShots.slice(0,6);
function run(command,args){return new Promise((resolve,reject)=>{const child=spawn(command,args,{cwd:root,stdio:'inherit'});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(`${command} exited ${code}`)))})}
try{await waitForServer();for(const [file,size,route] of shots)await run('chromium',['--headless','--disable-gpu','--no-sandbox','--run-all-compositor-stages-before-draw','--virtual-time-budget=5000',`--screenshot=${path.join(output,file)}`,`--window-size=${size}`,`http://127.0.0.1:4173${route}`]);console.log(`Visual snapshots saved in ${output}`)}finally{preview.kill('SIGTERM')}

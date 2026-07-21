import 'dotenv/config';
import { createApp, getConfig } from './app.ts';
import { connectStore } from './services/store.ts';

const port=Number(process.env.PORT||8787);const config=getConfig();
connectStore(process.env.MONGODB_URI,process.env.ALLOW_MEMORY_STORE==='true').then(mode=>{const app=createApp(config);app.listen(port,()=>console.log(`IT Boutique API listening on http://127.0.0.1:${port} (${mode} store)`))}).catch(error=>{console.error('API startup failed:',error);process.exit(1)});

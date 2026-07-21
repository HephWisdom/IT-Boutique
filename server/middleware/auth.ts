import type { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

export type AdminClaims={sub:string;role:'admin';csrf:string};
export function issueSession(email:string,secret:string){const csrf=crypto.randomBytes(24).toString('hex');const token=jwt.sign({sub:email,role:'admin',csrf} satisfies AdminClaims,secret,{expiresIn:'8h'});return{token,csrf}}
export function requireAdmin(secret:string){return(req:Request,res:Response,next:NextFunction)=>{const token=req.cookies?.admin_session;if(!token)return res.status(401).json({message:'Authentication required.'});try{const claims=jwt.verify(token,secret) as AdminClaims;if(claims.role!=='admin')throw new Error('Role denied');res.locals.admin=claims;next()}catch{return res.status(401).json({message:'Session expired or invalid.'})}}}
export function requireCsrf(req:Request,res:Response,next:NextFunction){if(['GET','HEAD','OPTIONS'].includes(req.method))return next();const claims=res.locals.admin as AdminClaims|undefined;const token=req.get('X-CSRF-Token');if(!claims||!token||token!==claims.csrf)return res.status(403).json({message:'Security token missing or invalid.'});next()}

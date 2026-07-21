import nodemailer from 'nodemailer';

type MailConfig={host?:string;port:number;secure:boolean;user?:string;pass?:string;from:string;adminEmail:string};
export function createMailer(config:MailConfig){
  if(!config.host||!config.user||!config.pass)return null;
  return nodemailer.createTransport({host:config.host,port:config.port,secure:config.secure,auth:{user:config.user,pass:config.pass}});
}
export async function sendSubmissionEmails(mailer:ReturnType<typeof createMailer>,config:MailConfig,data:{email:string;name:string;reference:string;kind:'project enquiry'|'talent profile'}){
  if(!mailer)return {status:'not-configured'} as const;
  const safeName=data.name.replace(/[<>]/g,'');const safeReference=data.reference.replace(/[<>]/g,'');
  const results=await Promise.allSettled([
    mailer.sendMail({from:config.from,to:data.email,subject:`We received your ${data.kind} · ${safeReference}`,text:`Hello ${safeName},\n\nThank you. Your ${data.kind} has been received. Your reference is ${safeReference}.\n\nKeep this reference if you need to follow up.\n`}),
    mailer.sendMail({from:config.from,to:config.adminEmail,subject:`New ${data.kind} · ${safeReference}`,text:`A new ${data.kind} was received from ${safeName} (${data.email}). Reference: ${safeReference}. Sign in to the protected admin dashboard to review it.`}),
  ]);
  return {status:results.every(x=>x.status==='fulfilled')?'sent':'partial-failure',results} as const;
}

import mongoose, { Schema } from 'mongoose';

const baseOptions={timestamps:true,strict:true};
const EnquirySchema=new Schema({
  reference:{type:String,required:true,unique:true,index:true},idempotencyKey:{type:String,required:true,unique:true,index:true},name:{type:String,required:true},organization:{type:String,required:true},email:{type:String,required:true,index:true},phone:String,country:String,organizationType:String,service:String,summary:String,challenge:String,outcome:String,budget:String,startPeriod:String,existingUrl:String,contactMethod:String,consent:Boolean,consentAt:Date,attachment:{originalName:String,storedName:String,mimeType:String,size:Number},status:{type:String,default:'New',index:true},internalNotes:{type:String,default:''},archived:{type:Boolean,default:false,index:true},emailDelivery:{type:String,default:'pending'},
},baseOptions);
const TalentSchema=new Schema({
  reference:{type:String,required:true,unique:true,index:true},idempotencyKey:{type:String,required:true,unique:true,index:true},name:String,email:{type:String,index:true},phone:String,countryTimezone:String,role:String,yearsExperience:Number,skills:String,portfolioUrl:String,githubUrl:String,linkedinUrl:String,availability:String,engagementType:String,introduction:String,consent:Boolean,consentAt:Date,attachment:{originalName:String,storedName:String,mimeType:String,size:Number},status:{type:String,default:'New',index:true},internalNotes:{type:String,default:''},archived:{type:Boolean,default:false,index:true},emailDelivery:{type:String,default:'pending'},
},baseOptions);
const ContentSchema=new Schema({type:{type:String,required:true,index:true},title:{type:String,required:true},slug:{type:String,required:true},data:{type:Schema.Types.Mixed,default:{}},archived:{type:Boolean,default:false,index:true}},baseOptions);ContentSchema.index({type:1,slug:1},{unique:true});
const ActivitySchema=new Schema({actor:{type:String,required:true},action:{type:String,required:true},entityType:{type:String,required:true},entityId:String,metadata:{type:Schema.Types.Mixed,default:{}}},baseOptions);

export const Enquiry=mongoose.models.Enquiry||mongoose.model('Enquiry',EnquirySchema);
export const Talent=mongoose.models.Talent||mongoose.model('Talent',TalentSchema);
export const Content=mongoose.models.Content||mongoose.model('Content',ContentSchema);
export const Activity=mongoose.models.Activity||mongoose.model('Activity',ActivitySchema);

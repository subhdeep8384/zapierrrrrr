import {email, z} from "zod";

export const userSchema = z.object({
    username : z.string().min(5) ,
    password : z.string().min(5) ,
    name : z.string().min(5) ,
})

export const signInSchema = z.object({
    email : z.string().email() ,
    username : z.string().min(5) ,
    password : z.string().min(5) ,
})
export const signUpSchema = z.object({
    username : z.string().min(5) ,
    password : z.string().min(5) ,
    name : z.string().min(5) ,
    email : z.string().min(5) ,
})


export const zapCreateSchema = z.object({
    userId : z.number() ,
    availableTriggerId : z.string() ,
    triggerMetadata : z.object().optional() ,
    actions : z.array(z.object({
        availableActionId : z.string() ,
        actionMetadata : z.object().optional() ,
    }))
})
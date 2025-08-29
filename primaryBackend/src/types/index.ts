import {z} from "zod";

export const userSchema = z.object({
    username : z.string().min(5) ,
    password : z.string().min(5) ,
    name : z.string().min(5) ,
})

export const signInSchema = z.object({
    username : z.string().min(5) ,
    password : z.string().min(5) ,
})
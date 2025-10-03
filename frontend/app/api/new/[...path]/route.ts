import { NextRequest, NextResponse } from "next/server";

export function GET(req : NextRequest , { params } : {params : {path : string[]}}){
    console.log(params.path)
    return NextResponse.json({message : "Hello Worlddgdfgdfg"})
}
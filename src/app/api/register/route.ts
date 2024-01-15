/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "~/server/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
){
  try {
    const body = await request.json();
    const { email, name, password } = body; 
    console.log(body)
    if(!email || !name || !password){
      return new NextResponse('Missing info', { status: 400})
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await db.user.create({
      data: {
          email,
          name,
          hashedPassword,
      }
    });

    return NextResponse.json(user);
    
  } catch(error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', {status: 500})
  }
}
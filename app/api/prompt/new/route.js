import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectDB();
    const newPromt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    await newPromt.save();

    return NextResponse.json(newPromt, { status: 201 });
  } catch (error) {
    return new NextResponse("Failed to create a new prompt!", { status: 500 });
  }
};

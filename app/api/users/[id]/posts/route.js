import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch prompts", { status: 500 });
  }
};

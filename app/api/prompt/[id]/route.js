import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new NextResponse("Propmt not found!", { status: 404 });
    }
    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectDB();

    const existsPromt = await Prompt.findById(params.id);
    if (!existsPromt) {
      return new NextResponse("Prompt not found!", { status: 404 });
    }

    existsPromt.prompt = prompt;
    existsPromt.tag = tag;

    await existsPromt.save();
    return NextResponse.json(existsPromt, { status: 200 });
  } catch (error) {
    return new NextResponse("Faild to update prompt! ", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    await Prompt.findByIdAndRemove(params.id);

    return new NextResponse("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Faild to delete prompt", { status: 500 });
  }
};

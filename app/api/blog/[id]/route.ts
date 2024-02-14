import { NextResponse } from "next/server";
// import { main } from "../route";
import prisma from "@/prisma";

const main = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    throw new Error("Database Connection Unsuccessful");
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];

    // await prisma.$connect();
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "ERROR" }, { status: 404 });
    }
    return NextResponse.json({ message: "SUCCESS", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    const { title, description } = await req.json();
    // await prisma.$connect();
    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "SUCCESS", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await prisma.$connect();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "SUCCESS", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

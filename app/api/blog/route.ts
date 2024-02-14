import prisma from "@/prisma";
import { NextResponse } from "next/server";

// export async function main() {
//   try {
//     await prisma.$connect();
//   } catch (err) {
//     return Error("Database Connection Unsuccessfull");
//   }
// }

const main = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    throw new Error("Database Connection Unsuccessful");
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    // await prisma.$connect();
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "SUCCESS", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();

    // await prisma.$connect();
    await main();
    const posts = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: "SUCCESS", posts }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

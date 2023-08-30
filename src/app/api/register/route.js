import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const { pseudo, email, password } = await req.json();
    await connect();
    const userAlreadyExist = await Users.findOne({ email }).select("_id");
    if (userAlreadyExist) {
      return NextResponse.json({
        success: false,
        message: "User Already Exist",
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      await Users.create({
        pseudo,
        email,
        password: hashedPassword,
      });

      return NextResponse.json(
        { success: true, message: "Successfully Registered !" },
        { status: 201 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: e.message, message: "Failed to Register... Try again later" },
      { status: 500 }
    );
  }
}

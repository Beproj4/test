// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import mongoose from "mongoose";
import connectDb from "@/lib/mongodb";


export async function GET() {
    await connectDb()
  try {
    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch products" });
  }
}

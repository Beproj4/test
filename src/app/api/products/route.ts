// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import mongoose from "mongoose";
import connectDb from "@/lib/mongodb";
import { storage } from "@/lib/firebase";


export async function POST(req: Request) {
   await connectDb()
  try {
    const { name, description, price, image } = await req.json();

    // Save image to Firebase
    const imageBuffer = Buffer.from(image, "base64");
    const storageRef = ref(storage, `products/${Date.now()}_${name}.jpg`);
    const snapshot = await uploadBytes(storageRef, imageBuffer);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Save product to MongoDB
    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl,
    });

    await newProduct.save();

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to add product" });
  }
}

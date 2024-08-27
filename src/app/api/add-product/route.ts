import connectDb from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    connectDb();
    try {
        const { name, description, price, image } = await req.json();
        if(!name || !description || !price || !image){
            return NextResponse.json({
                success : false,
                message : "All the fields are required"
            },{
                status : 401
            })
        }
        const newProduct = new Product({
            name,description,price,image
        })
        await newProduct.save();
        return NextResponse.json({ success: true, product: newProduct });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to add product" },{
            status : 401
        });
    }
}
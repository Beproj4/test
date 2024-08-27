"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for router in App Router
import { useFirebaseUpload } from "@/hooks/useFirebaseUpload"; // Custom hook for uploading to Firebase
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be "px" or "%"
    width: 50,
    height: 50,
    x: 0,
    y: 0,
  });
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const router = useRouter();

  const handleImageUpload = async () => {
    if (croppedImage) {
      const imageUrl = await useFirebaseUpload(croppedImage);
      return imageUrl;
    }
    return null;
  };

  const handleAddProduct = async () => {
    const imageUrl = await handleImageUpload();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, image: imageUrl }),
    });

    if (res.ok) {
      router.push("/products");
    } else {
      alert("Failed to add product");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (crop: PixelCrop) => {
    if (!image || !crop.width || !crop.height) return;

    const img = new Image();
    img.src = image;

    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Convert the cropped area to a blob and save it
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "croppedImage.jpg", {
            type: "image/jpeg",
          });
          setCroppedImage(file);
        }
      }, "image/jpeg");
    }
  };

  return (
    <div className="w-full mt-10 flex flex-col  gap-y-10 items-center justify-center">
      <h1>Add Product</h1>
      <form onSubmit={(e) => e.preventDefault()} className="grid w-[45vw]  grid-cols-1 gap-2 ">
        <input
          className="p-1.5 text-black"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
        className="p-1.5 text-black"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
        className="p-1.5 text-black"
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(crop) => handleCropComplete(crop)}
          >
            <img src={image} alt="Crop me" />
          </ReactCrop>
        )}
        <button type="button" onClick={handleAddProduct} className="p-1.5 bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
}

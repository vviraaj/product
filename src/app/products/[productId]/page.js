"use client";
import { useEffect, useState } from "react";


export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const { productId } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-indigo-300 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl p-8 rounded-lg bg-white shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {product.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-[350px] w-[350px] rounded-lg"
          />
          <div className="flex-1 ">
            <p className="text-gray-700 mb-4 ">{product.description}</p>
            <p className="text-gray-700 mb-4">Category: {product.category}</p>
            <p className="text-gray-700 mb-4">Price: ${product.price}</p>
       
            <p className="text-gray-700 mb-4">
              Rating: {product.rating.rate} - ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import starlogo from "@/Svg/star.svg";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  const handleApply = () => {
    let filteredList = originalProductList.filter((product) => {
      const titleMatch = selectedTitle
        ? product.title.toLowerCase().includes(selectedTitle.toLowerCase())
        : true;
      const categoryMatch = selectedCategory
        ? product.category === selectedCategory
        : true;
      const priceMatch = product.price >= priceRange;

      return titleMatch && categoryMatch && priceMatch;
    });

    setProductList(filteredList);
  };

  const handleSort = (order) => {
    const sortedList = [...productList].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.price - b.price;
      } else if (order === "highToLow") {
        return b.price - a.price;
      }
    });

    setProductList(sortedList);
    setSortBy(order);
  };

  const handleClearFilter = () => {
    // Reset the productList to the original unfiltered list
    setProductList(originalProductList);
    // Reset the state variables for filters to their initial values
    setSelectedCategory("");
    setSelectedTitle("");
    setPriceRange(0);
  };

  const handleproductdetail = (id) => {
    router.replace(`/products/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProductList(data);
        setOriginalProductList(data); // Save the original unfiltered list
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                 
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 ring-1 ring-white/10">
                    <div className="border-red-600 h-16 bg-slate-600 px-2 flex items-center justify-center">
                      <p className="text-white">Filters</p>
                    </div>

                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 p-6">
                      <nav className="flex flex-1 flex-col space-y-6">
                        <div>
                          <label className="text-white">Title</label>
                          {/* Category dropdown */}
                          <input
                            value={selectedTitle}
                            onChange={(e) => setSelectedTitle(e.target.value)}
                            className="border border-gray-400 rounded-md p-1 mt-2 w-full"
                          ></input>
                        </div>
                        <div>
                          <label className="text-white">Categories</label>
                          {/* Category dropdown */}
                          <select
                            value={selectedCategory}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                            className="border border-gray-400 rounded-md p-1 mt-2 w-full"
                          >
                            <option value="">Select Category</option>
                            <option value="men's clothing">
                              Men's Clothing
                            </option>
                            <option value="jewelery">Jwelery</option>
                            <option value="electronics">Electronics</option>
                            <option value="women's clothing">
                              Women's Clothing
                            </option>
                          </select>
                        </div>

                        <div>
                          <p className="text-white">
                            Price Range: {priceRange}
                          </p>
                          <input
                            type="range"
                            min={0}
                            max={1000}
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full mt-2"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApply}
                          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Apply
                        </button>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

      
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        
          <div className="border-red-600 h-16 bg-slate-600 px-2 flex items-center justify-center">
            <p className="text-white">Filters</p>
          </div>

          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 p-6">
            <nav className="flex flex-1 flex-col space-y-6">
              <div>
                <label className="text-white">Title</label>
                {/* Category dropdown */}
                <input
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                  className="border border-gray-400 rounded-md p-1 mt-2 w-full"
                ></input>
              </div>
              <div>
                <label className="text-white">Categories</label>
                {/* Category dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-400 rounded-md p-1 mt-2 w-full"
                >
                  <option value="">Select Category</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="jewelery">Jwelery</option>
                  <option value="electronics">Electronics</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>

              <div>
                <p className="text-white">Price Range: {priceRange}</p>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full mt-2"
                />
              </div>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleClearFilter}
                className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm
                 font-semibold text-white shadow-sm hover:bg-yellow-500 
                  "
              >
                Clear Filter
              </button>
            </nav>
          </div>
        </div>

        {/* Main section here content and others */}

        <div className="lg:pl-72">
          <div
            className="sticky top-0 z-40 flex h-20  shrink-0 items-center gap-x-4 border-b 
          border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
          >
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-grow justify-center items-center lg:space-x-6 space-x-1 ">
              <p className="border-2 p-2 rounded-md bg-slate-900 text-white text-sm ">
                Sort By
              </p>
              <button
                onClick={() => handleSort("lowToHigh")}
                type="button"
                className={`rounded-full bg-violet-600 lg:px-4 lg:py-2.5 p-1  text-sm  font-semibold
               text-white shadow-sm hover:bg-red-500 focus-visible:outline 
               focus-visible:outline-2 focus-visible:outline-offset-2 
                 focus-visible:outline-indigo-600 ${
                   sortBy === "lowToHigh" ? "bg-red-500" : ""
                 }`}
              >
                Price - Low to High
              </button>
              <button
                type="button"
                onClick={() => handleSort("highToLow")}
                className={`rounded-full bg-violet-600 lg:px-4 lg:py-2.5 p-1 text-sm font-semibold 
              text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                sortBy === "highToLow" ? "bg-red-500" : ""
              }`}
              >
                Price - High to Low
              </button>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {productList.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleproductdetail(product.id)}
                      className="flex flex-col bg-gray-100 hover:bg-blue-200 
                      rounded-lg overflow-hidden shadow-md cursor-pointer"
                    >
                      <div
                        className="h-auto w-full   overflow-hidden rounded-lg
                             bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-[300px] w-[300px] r group-hover:opacity-75"
                        />
                      </div>
                      <div className="p-4 ">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 overflow-hidden line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-gray-700 text-sm font-bold">
                            {product.category}
                          </p>
                          <p className="text-gray-700 text-sm font-bold">
                            {product.price}$
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600 text-sm font-bold ">
                            Reveiws: {product.rating.count}
                          </p>
                          <div className="flex space-x-1">
                            <p className="text-gray-600 text-sm">
                              {product.rating.rate}
                            </p>
                            <Image
                              src={starlogo}
                              height={15}
                              width={15}
                            ></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

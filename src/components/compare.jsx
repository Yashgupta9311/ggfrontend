// src/pages/Compare.jsx  (replace your current Compare component with this)
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import zeptoLogo from "../components/images/zepto.png";
import amazonLogo from "../components/images/amazon.png";
import bbLogo from "../components/images/bb.png";
import blinkitLogo from "../components/images/blinkit.png";
import swiggyLogo from "../components/images/swiggy.png";
import Loader from "../components/Loader";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";


const storeLogos = {
  zepto: zeptoLogo,
  zeptosupersaver: "https://cdn.zeptonow.com/web-static-assets-prod/artifacts/13.4.0/images/super-saver/super-saver-active.svg",
  amazonfresh: amazonLogo,
  bbnow: bbLogo,
  blinkit: blinkitLogo,
  swiggy: swiggyLogo,
};



const ProductCard = ({ products }) => {
  const [showAll, setShowAll] = useState(true);

  const bestPriceProduct = [...products].sort((a, b) => {
    const priceA = parseFloat((a.price || "0").replace(/[₹,]/g, ""));
    const priceB = parseFloat((b.price || "0").replace(/[₹,]/g, ""));
    return priceA - priceB;
  })[0];

  const displayedProducts = showAll ? products : [bestPriceProduct];

  return (
    <div className="p-5 bg-white shadow-md rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProducts
          .filter(p => p && p.title && p.price)
          .map((product, i) => {
            const isBest = product === bestPriceProduct;
            return (
              <Link to={product.link} target="_blank" key={i}>
                <div className="border border-gray-100 p-3 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.title}</p>
                      <p className="text-xs text-gray-500">{product.weight}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-5">
                      <p className="text-amber-500 font-bold">{product.price}</p>
                      <p className="text-gray-500 line-through">{product.mrp}</p>
                    </div>
                    {storeLogos[product.source] && (
                      <img src={storeLogos[product.source]} alt={product.source} className="w-8 h-8 rounded-full" />
                    )}
                  </div>

                  {isBest && (
                    <span className="mt-2 text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full self-start">
                      Best Saver
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
      </div>

      {products.length > 1 && (
        <div className="text-center mt-4">
          <button onClick={() => setShowAll(!showAll)} className="text-sm px-4 py-2 bg-amber-500 hover:bg-yellow-500 cursor-pointer rounded-md text-white">
            {showAll ? "Show Best Price" : "Show All Options"}
          </button>
        </div>
      )}
    </div>
  );
};


const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const [results, setResults] = useState({}); // will hold grouped object
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(query || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        // read coords from localStorage (set by Home component)
        const lat = localStorage.getItem("lat");
        const lon = localStorage.getItem("lon");
        // build url: include coords if present
        const coords = lat && lon ? `&latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}` : "";
        const res = await fetch(`https://groceryguru-3dio.onrender.com/compare?query=${encodeURIComponent(query)}${coords}`);

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Server error: ${res.status} ${txt}`);
        }

        const data = await res.json();
        // support both shapes: { grouped } or direct grouped object
        const grouped = data?.grouped ?? data;
        setResults(grouped || {});
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Something went wrong. Please try again or search for trending items.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  // when user searches from this compare page, include coords too
  const onSearchEnter = () => {
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");
    const coords = lat && lon ? `&latitude=${lat}&longitude=${lon}` : "";
    if (inputValue.trim()) {
      navigate(`/compare?query=${encodeURIComponent(inputValue.trim())}${coords}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Compare Prices - GroceryGuru</title>
        <meta name="description" content="Live price comparison of groceries from multiple apps." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="w-full border border-gray-200 fixed top-0 bg-white">
          <nav className="flex justify-between items-center px-6 py-5">
            <div className="font-bold text-2xl text-gray-800">
              <span className="text-emerald-500">Grocery</span>
              <span className="text-amber-500"> Guru</span>
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearchEnter();
                }
              }}
              placeholder='Search for "products"'
              className="w-100 bg-gray-100 rounded-lg px-3 py-3"
            />

            <div>Location</div>
          </nav>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="text-center p-5 mt-10 mx-auto ">
            <div className="flex justify-center items-center">
              <DotLottieReact src="https://lottie.host/699b8f06-adac-4cc0-aa21-4344961b9017/FhLSvCD7xD.lottie" loop autoplay className="w-64 h-64" />
            </div>

            <p className="flex flex-col gap-3">
              <span className="font-bold">Oops… our server went to grab a juice and forgot to come back.</span>
              <span className="font-bold">Try again in a bit — or check out trending items while we wake it up.</span>
            </p>
            <button className="mt-4 px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        <div className="space-y-8 p-6 mt-30">
          {Object.entries(results)
            .filter(([_, products]) => Array.isArray(products) && products.some(p => p && p.title && p.price))
            .map(([groupKey, products]) => (
              <ProductCard key={groupKey} products={products} />
            ))}
        </div>

        <footer className="w-full h-50 custom">
          <div className="p-5">
            <div className="font-bold text-center text-xl">
              <span className="text-emerald-500">Grocery</span>
              <span className="text-amber-500"> Guru</span>
            </div>
            <span className="text-sm text-gray-100 block text-center p-3">© 2025 GroceryGuru | All rights reserved.</span>
            <span className="text-sm text-gray-100 block text-center p-3">Need help? contact us by droping a mail at <a href="mailto:groceryguru.help@gmail.com" target="_blank" rel="noreferrer"><b>groceryguru.help@gmail.com</b></a></span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Compare;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import zeptologo from "../components/images/zepto.png"
import amazonlogo from "../components/images/amazon.png"
import bblogo from "../components/images/bb.png"
import blinkitlogo from "../components/images/blinkit.png"
import swiggylogo from "../components/images/swiggy.png"
import attapng from "../components/images/atta.png"
import dalpng from "../components/images/dal.png"
import depowderpng from "../components/images/depowder.png"
import milkpng from "../components/images/milk.png"
import oilpng from "../components/images/oil.png"
import ricepng from "../components/images/rice.png"
import saltpng from "../components/images/salt.png"
import sugarpng from "../components/images/sugar.png"
import teapng from "../components/images/tea.png"
import toothpastepng from "../components/images/toothpaste.png"
import biscuitpng from "../components/images/biscuit.png"
import juicepng from "../components/images/juice.png"
import breadpng from "../components/images/bread.png"
import icecreampng from "../components/images/icecream.png"
import vegetablespng from "../components/images/vegetables.png"
import maggipng from "../components/images/maggi.png"
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


const Home = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0)
  const [location, setLocation] = useState("detecting")
  const [loading, setLoading] = useState(false)
  const holdertext = [
    'search on "zepto"',
    'search on "amazonfresh"',
    'search on "blinkit"',
    'search on "bbnow"',
    'search on "swiggy"',
  ]

  useEffect(() => {
    const interval = setInterval(() => {

      setIndex((prev) => (prev + 1) % holdertext.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");

    if (query.trim()) {
      navigate(`/compare?query=${encodeURIComponent(query)}&latitude=${lat}&longitude=${lon}`);
      
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true)

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          localStorage.setItem("lat", latitude);
          localStorage.setItem("lon", longitude);

          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
              headers: {
                "User-Agent": "GroceryGuru/1.0 (groceryguru.help@gmail.com)"
              }
            });

            const data = await res.json();
            const address = data?.address?.suburb || "new delhi";
            const pin = data?.address?.postcode || "110001";

            setLocation(`${address},${pin}`)
          } catch (err) {
            console.error("Error fetching pincode:", err);
            setLocation("new delhi ,110001");
          }
          finally {
            setLoading(false)
          }
        },
        (err) => {
          console.error("Location error:", err);
          setLocation("new delhi ,110001");
          setLoading(false)
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
   
  }, []);



  return (
    <div>
      <div className="relative w-full border border-gray-200  ">
        <nav className="flex justify-between items-center px-6 py-5 gap-1 ">

          <div className="font-bold text-xs text-gray-800 sm:text-sm md:text-lg   ">
            <span className="text-emerald-500">Grocery</span>
            <span className="text-amber-500"> Guru</span>

          </div>
          <div className="">
            <input
              className="w-[150px] bg-gray-100 rounded-lg px-3 py-2 h-7 text-xs  sm:w-[300px]  sm:h-8 md:max-w-[450px] "
              type="text"
              placeholder={holdertext[index]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}

            />
          </div>
          <div className="text-xs sm:text-sm md:text-lg ">{location}</div>
        </nav>
      </div>
      <div className="logo-conatiner flex mt-10 justify-center gap-5 flex-wrap  ">
        <div className="w-12 h-12 bg-white border border-gray-300 shadow-lg rounded-lg flex items-center justify-center sm:w-16 sm:h-16  ">
          <Link to="https://www.zeptonow.com/" target="_blank">
            <img className="w-9 h-9 rounded-2xl ubbounce delay-1 sm:w-12 sm:h-12" src={zeptologo} alt="" />
          </Link>
        </div>
        <div className="w-12 h-12 bg-white border border-gray-300 shadow-lg rounded-lg flex items-center justify-center sm:w-16 sm:h-16">
          <Link to="https://www.amazon.in/alm/storefront?almBrandId=ctnow" target="_blank">
            <img className="w-9 h-9 rounded-2xl ubbounce delay-2 sm:w-12 sm:h-12 " src={amazonlogo} alt="" />
          </Link>
        </div>
        <div className="w-12 h-12 bg-white border border-gray-300 shadow-lg rounded-lg flex items-center justify-center sm:w-16 sm:h-16">
          <Link to="https://www.swiggy.com/instamart/" target="_blank">
            <img className="w-9 h-9  rounded-2xl ubbounce delay-3 sm:w-12 sm:h-12" src={swiggylogo} alt="" />
          </Link>
        </div>
        <div className="w-12 h-12 bg-white border border-gray-300 shadow-lg rounded-lg flex items-center justify-center sm:w-16 sm:h-16">
          <Link to="https://blinkit.com/" target="_blank">
            <img className="w-9 h-9 rounded-2xl ubbounce delay-4 sm:w-12 sm:h-12" src={blinkitlogo} alt="" />
          </Link>

        </div>
        <div className="w-12 h-12 bg-white border border-gray-300 shadow-lg rounded-lg flex items-center justify-center sm:w-16 sm:h-16">
          <Link to="https://www.bigbasket.com/bbnow/" target="_blank">
            <img className="w-9 h-9 rounded-2xl ubbounce delay-5 sm:w-12 sm:h-12" src={bblogo} alt="" />
          </Link>
        </div>
      </div>
      <div className="mt-20 mb-50">
        <h2 className="poppins-semibold text-center">Trending Essentials</h2>
        <div className="grid grid-cols-4 grid-rows-2 mt-10 justify-center justify-items-center gap-x-0 gap-y-7 sm:grid-cols-4 md:grid-cols-8 ">
          <Link to="/compare?query=atta">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 md:w-24 md:h-24 " >
              <img src={attapng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=dal">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={dalpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=washing powder">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={depowderpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=milk">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={milkpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=oil">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={oilpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=rice">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={ricepng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=salt">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22">
              <img src={saltpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=sugar">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={sugarpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=tea">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={teapng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=toothpaste">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={toothpastepng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=biscuit">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={biscuitpng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=juice">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={juicepng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=icecream">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={icecreampng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=noodles">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={maggipng} alt="atta.png" />
            </div>
          </Link>
          <Link to="/compare?query=vegetables">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm flex flex-col items-center justify-center sm:w-22 sm:h-22">
              <img src={vegetablespng} alt="atta.png" />
            </div>

          </Link>
          <Link to="/compare?query=bread">
            <div className="w-18 h-18 border border-gray-200 rounded-3xl shadow-sm sm:w-22 sm:h-22 ">
              <img src={breadpng} alt="atta.png" />
            </div>
          </Link>


        </div>
        {loading && <Loader />}
      </div>

      <footer className="w-full h-40 custom md:h-65 ">

        <div className="p-5 md:p-12">
          <div className="font-bold text-center text-sm md:text-xl  ">
            <span className="text-emerald-500 ">Grocery</span>
            <span className="text-amber-500"> Guru</span>

          </div>
          <span className="text-xs md:text-sm  text-gray-100 block text-center p-3">© 2025 GroceryGuru | All rights reserved.</span>
          <span className="text-xs md:text-sm text-gray-100 block text-center p-3">Need help? contact us by droping a mail at <a href="mailto:groceryguru.help@gmail.com" target="_blank" ><b>groceryguru.help@gmail.com</b></a></span>

        </div>

      </footer>

    </div>


  );
};

export default Home;


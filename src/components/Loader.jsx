import React from "react";
import zeptoLogo from "../components/images/zepto.png";
import amazonLogo from "../components/images/amazon.png";
import bbLogo from "../components/images/bb.png";
import blinkitLogo from "../components/images/blinkit.png";
import swiggyLogo from "../components/images/swiggy.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 pointer-events-auto">
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48">
        <defs>
          <clipPath id="circleClip">
            <circle cx="150" cy="60" r="20" />
          </clipPath>
        </defs>

        <circle className="pulse-circle" cx="150" cy="150" r="60" fill="#4CAF50" />
        <text className="rupee" x="150" y="165" textAnchor="middle">₹</text>

        <g className="orbit-group">
          <image href={zeptoLogo} x="130" y="40" width="40" height="40" clipPath="url(#circleClip)" />
          <image href={swiggyLogo} x="130" y="40" width="40" height="40" transform="rotate(72 150 150)" clipPath="url(#circleClip)" />
          <image href={amazonLogo} x="130" y="40" width="40" height="40" transform="rotate(144 150 150)" clipPath="url(#circleClip)" />
          <image href={blinkitLogo} x="130" y="40" width="40" height="40" transform="rotate(216 150 150)" clipPath="url(#circleClip)" />
          <image href={bbLogo} x="130" y="40" width="40" height="40" transform="rotate(288 150 150)" clipPath="url(#circleClip)" />
        </g>

        <text x="150" y="290" textAnchor="middle" fontSize="15" fill="#000" fontWeight="bold">
          Comparing best prices...
        </text>
      </svg>

      {/* Styles */}
      <style>{`
        .orbit-group {
          animation: spin 6s linear infinite;
          transform-origin: 150px 150px;
        }

        .rupee {
          font: bold 60px Arial, sans-serif;
          fill: white;
         
        }

        .pulse-circle {
          animation: pulseCircle 2s infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes pulseCircle {
          0%, 100% { r: 60; }
          50% { r: 65; }
        }
      `}</style>
    </div>
  );
};

export default Loader;

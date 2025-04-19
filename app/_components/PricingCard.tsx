import React from 'react';

const PricingCard = () => {
  return (
    <div className="mx-auto bg-white min-w-[350px] text-gray-900 shadow-md rounded-xl p-6 border border-gray-200">
      <div className="text-center border-b border-gray-200 pb-4 mb-4">
        <p className="uppercase text-sm font-semibold">Starter</p>
        <div className="mt-2 flex justify-center items-start gap-1 font-bold text-5xl">
          <span className="text-2xl mt-2">Rs. </span>
          150
          <span className="text-2xl self-end">/mo</span>
        </div>
      </div>

      <ul className="space-y-3">
        {[
          '2 Teams',
          'Unlimited Files',
          'Team Collaboration',
        ].map((text, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="flex items-center justify-center bg-green-100 border border-green-300 rounded-full w-8 h-8">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-sm">{text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button className="w-full bg-gray-900 text-white uppercase py-2 px-4 rounded-lg hover:bg-gray-800 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PricingCard;

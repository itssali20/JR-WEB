import React, { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      price: { monthly: 499, annual: 4990 },
      description: "Freelancers and small businesses",
      buttonColor: "bg-gray-900 hover:bg-gray-800",
      highlight: false,
      features: [
        { text: "Brand design and development", included: true },
        { text: "Premium website design and development", included: true },
        { text: "20 hours of website maintenance per month", included: true },
        { text: "8 blog posts per month", included: true },
        { text: "4 email marketing campaigns per month", included: false },
        { text: "Social media account management (20 posts per month)", included: false },
        { text: "Search Engine Optimization (SEO) services", included: false },
      ],
    },
    {
      name: "Growth",
      price: { monthly: 799, annual: 7990 },
      description: "Agencies and startups",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      highlight: true,
      features: [
        { text: "Brand design and development", included: true },
        { text: "Premium website design and development", included: true },
        { text: "20 hours of website maintenance per month", included: true },
        { text: "8 blog posts per month", included: true },
        { text: "4 email marketing campaigns per month", included: true },
        { text: "Social media account management (20 posts per month)", included: true },
        { text: "Search Engine Optimization (SEO) services", included: false },
      ],
    },
    {
      name: "Professional",
      price: { monthly: 1599, annual: 15990 },
      description: "Established enterprises and corporations",
      buttonColor: "bg-gray-900 hover:bg-gray-800",
      highlight: false,
      features: [
        { text: "Brand design and development", included: true },
        { text: "Premium website design and development", included: true },
        { text: "20 hours of website maintenance per month", included: true },
        { text: "8 blog posts per month", included: true },
        { text: "4 email marketing campaigns per month", included: true },
        { text: "Social media account management (20 posts per month)", included: true },
        { text: "Search Engine Optimization (SEO) services", included: true },
      ],
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-orange-600 font-semibold mb-2">{`{ Our Pricing Plans }`}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
          CHOOSE THE PERFECT PLAN FOR YOUR BUSINESS
        </h2>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center space-x-4">
          <span
            className={`text-lg font-medium ${
              billingCycle === "monthly" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Monthly
          </span>
          <div
            onClick={() =>
              setBillingCycle(
                billingCycle === "monthly" ? "annual" : "monthly"
              )
            }
            className="w-16 h-8 bg-gray-200 rounded-full relative cursor-pointer"
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-orange-500 transition-all duration-300 ${
                billingCycle === "annual" ? "translate-x-8" : ""
              }`}
            ></div>
          </div>
          <span
            className={`text-lg font-medium ${
              billingCycle === "annual" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Annual
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-[2rem] border ${
              plan.highlight
                ? "border-orange-400"
                : "border-gray-200"
            } p-10 flex flex-col`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold text-orange-500 mb-1">
              ${billingCycle === "monthly"
                ? plan.price.monthly
                : plan.price.annual}
              <span className="text-base text-gray-600 font-normal">
                / {billingCycle === "monthly" ? "month" : "year"}
              </span>
            </p>
            <p className="text-gray-500 mb-6">{plan.description}</p>

            {/* Button */}
            <button
              className={`${plan.buttonColor} text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all`}
            >
              Get Started <ArrowRight size={18} />
            </button>

            {/* Features */}
            <ul className="mt-8 space-y-4">
              {plan.features.map((f, idx) => (
                <li
                  key={idx}
                  className={`flex items-center text-base ${
                    f.included ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {f.included ? (
                    <Check size={18} className="text-green-500 mr-3" />
                  ) : (
                    <X size={18} className="text-gray-300 mr-3" />
                  )}
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

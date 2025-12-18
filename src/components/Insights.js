import React from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function InsightsSection() {
  // Use the shared posts data file
  // (this array is now imported from `src/data/posts.js`)

  return (
    <section className="bg-white pt-60 pb-32 lg:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl lg:text-4xl font-semibold md:font-semibold lg:font-extrabold text-gray-900 mb-16 leading-tight max-w-6xl">
          STAY AHEAD WITH THE LATEST IN DIGITAL MARKETING
        </h2>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <Link
              key={index}
              to={post.url}
              className="group block cursor-pointer no-underline text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-[1rem]"
              aria-label={`Read post: ${post.title}`}
            >
              <div className="rounded-[2rem] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
                <span className="mx-2">/</span>
                <span>{post.category}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

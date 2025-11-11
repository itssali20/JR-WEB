import React from "react";
import { Calendar } from "lucide-react";

export default function InsightsSection() {
  const posts = [
    {
      title: "The Future of AI in Digital Marketing",
      date: "May 5, 2025",
      category: "Insights",
      image: "https://png.pngtree.com/background/20250319/original/pngtree-a-vibrant-digital-representation-of-interconnected-cubes-with-neon-lighting-effects-picture-image_16302866.jpg",
    },
    {
      title: "The Role of Artificial Intelligence in Modern Digital Marketing",
      date: "May 5, 2025",
      category: "Insights",
      image: "https://w0.peakpx.com/wallpaper/772/946/HD-wallpaper-robot-rubik-s-cube-movie-wall%C2%B7e-character-wall%C2%B7e.jpg",
    },
    {
      title: "Top Digital Marketing Trends for 2025",
      date: "May 3, 2025",
      category: "Marketing",
      image: "https://framerusercontent.com/images/5yyiq2tkZSescxjDzYMQnk1n8E.jpg",
    },
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-gray-900 mb-16 leading-tight max-w-3xl">
          STAY AHEAD WITH THE LATEST IN DIGITAL MARKETING
        </h2>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <div key={index} className="group">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './blog.css';
export default function BlogPost() {
  const { slug } = useParams();

  const findPostBySlug = (s) => {
    if (!s) return null;
    return posts.find((p) => p.url.endsWith(s));
  };

  const post = findPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto py-24 px-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Post not found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link to="/" className="text-indigo-600 underline">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto py-24 px-6">
        <div className="rounded-[1rem] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
        </div>
        <div className="mt-8 text-gray-600 text-sm flex items-center">
          <span>{post.date}</span>
          <span className="mx-2">/</span>
          <span>{post.category}</span>
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">{post.title}</h1>
        <div className="mt-6 prose prose-lg text-gray-800" dangerouslySetInnerHTML={{ __html: post.body }} />

        <div className="mt-10">
          <Link to="/" className="text-indigo-600 underline">Back to home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

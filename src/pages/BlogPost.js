import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsletterBox from '../components/NewsletterBox';
import './blog.css';

export default function BlogPost() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const findPostBySlug = (s) => {
    if (!s) return null;
    return posts.find((p) => p.url.endsWith(s));
  };

  const post = findPostBySlug(slug);

  // Get other posts for "Latest Blogs" section, excluding current one
  const otherPosts = posts.filter(p => p !== post).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto py-24 px-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">{t("blogpost.not_found_title")}</h1>
          <p className="text-gray-600 mb-6">{t("blogpost.not_found_desc")}</p>
          <Link to="/" className="text-indigo-600 underline">{t("blogpost.back_home")}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-white/80 text-sm md:text-base mb-4">
              <span className="uppercase tracking-wider font-medium">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">

          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
              <p className="lead text-xl text-gray-600 mb-8 font-medium">{post.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          </div>

          {/* Sidebar / Floating Newsletter */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 z-10">
              <NewsletterBox />
            </div>
          </div>

        </div>

        {/* Latest Blogs Section */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide">{t("blogpost.latest_blogs")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {otherPosts.map((p) => (
              <Link key={p.url} to={p.url} className="group block">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                  {p.category} • {p.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

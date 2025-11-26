import React from 'react';

export default function NewsletterBox() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-sm">
            <div className="flex items-center gap-2 mb-4 text-orange-500 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
                </svg>
                <span>Stay Inspired</span>
            </div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">
                Get fresh design insights, articles, and news delivered directly to your inbox.
            </h3>
            <form className="space-y-3">
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

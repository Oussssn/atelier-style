import React from 'react';

const tips = [
  {
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Perfect Base Makeup",
    description: "Learn how to create a flawless foundation base that lasts all day."
  },
  {
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Eye Makeup Techniques",
    description: "Master the art of eye makeup with these professional tips."
  },
  {
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Lip Color Guide",
    description: "Find your perfect lip color and application techniques."
  }
];

export default function TipsSection() {
  return (
    <section id="tips" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Trending Makeup Tips
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
                <button className="mt-4 text-pink-500 font-semibold hover:text-pink-600">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
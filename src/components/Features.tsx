import React from 'react';
import { MessageSquare, Heart, Clock, Palette } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: '24/7 Makeup Advice',
    description: 'Get instant answers to all your makeup questions anytime, anywhere.'
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Personalized Tips',
    description: 'Receive customized recommendations based on your skin type and preferences.'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Quick Solutions',
    description: 'Find the perfect makeup solutions in minutes, not hours.'
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Trend Updates',
    description: 'Stay updated with the latest makeup trends and techniques.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose BeautyBot?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-pink-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
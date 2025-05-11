import React from "react";
import { FaGraduationCap, FaUsers, FaCertificate, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGraduationCap className="w-12 h-12 text-[#4D5EDC]" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience"
    },
    {
      icon: <FaUsers className="w-12 h-12 text-[#4D5EDC]" />,
      title: "Community Learning",
      description: "Join a vibrant community of learners and share your journey"
    },
    {
      icon: <FaCertificate className="w-12 h-12 text-[#4D5EDC]" />,
      title: "Certified Courses",
      description: "Get industry-recognized certificates upon course completion"
    },
    {
      icon: <FaHeadset className="w-12 h-12 text-[#4D5EDC]" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your learning needs"
    }
  ];

  return (
    <div className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best learning experience for our students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#4D5EDC] mb-2">10K+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#4D5EDC] mb-2">500+</h3>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#4D5EDC] mb-2">100+</h3>
              <p className="text-gray-600">Courses Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs; 
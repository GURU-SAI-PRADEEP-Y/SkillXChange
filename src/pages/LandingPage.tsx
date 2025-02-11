import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <GraduationCap className="h-16 w-16 text-indigo-600" />
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Skills with</span>
                  <span className="block text-indigo-600">Expert Mentorship</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Connect with industry experts, learn new skills, and accelerate your career growth through personalized mentorship sessions.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <Button onClick={() => navigate('/signup')} className="w-full sm:w-auto">
                    Get Started
                  </Button>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button variant="secondary" onClick={() => navigate('/signin')} className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700">
                  <Users className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Expert Mentors
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Learn from industry professionals with years of experience in their fields.
                </p>
              </div>
            </div>

            <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700">
                  <BookOpen className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Personalized Learning
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Get customized guidance tailored to your specific needs and goals.
                </p>
              </div>
            </div>

            <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700">
                  <Award className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Skill Certification
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Earn certificates and build a portfolio to showcase your achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
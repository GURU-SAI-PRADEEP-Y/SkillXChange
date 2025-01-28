import React, { useEffect, useState } from 'react';
import { Navbar } from '../navigation/Navbar';
import { GigList } from './GigList';
import { MentorStats } from './MentorStats';
import { Button } from '../Button';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function MentorDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    completionRate: 100,
    rating: 5.0
  });

  useEffect(() => {
    loadMentorStats();
  }, []);

  const loadMentorStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }

      const { data: mentorStats, error: statsError } = await supabase
        .from('mentor_profiles')
        .select('total_students, completion_rate, rating')
        .eq('id', user.id)
        .single();

      if (statsError) throw statsError;

      if (mentorStats) {
        setStats({
          totalStudents: mentorStats.total_students || 0,
          completionRate: mentorStats.completion_rate || 100,
          rating: mentorStats.rating || 5.0
        });
      }
    } catch (error) {
      console.error('Error loading mentor stats:', error);
      setStats({
        totalStudents: 0,
        completionRate: 100,
        rating: 5.0
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Progress</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Active Gigs</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Sessions</p>
                  <p className="text-2xl font-bold">{stats.completionRate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="text-2xl font-bold">{stats.rating.toFixed(1)}/5.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gigs */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Gigs</h1>
              <Link to="/mentor/gigs/create">
                <Button>
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Gig
                </Button>
              </Link>
            </div>
            <GigList />
          </div>
        </div>
      </main>
    </div>
  );
}
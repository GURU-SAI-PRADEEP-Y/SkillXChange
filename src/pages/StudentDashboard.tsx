import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { SearchBar } from '../components/student/SearchBar';
import { StudentGigList } from '../components/student/StudentGigList';
import { supabase } from '../lib/supabase';
import { Gig } from '../types/mentor';

export function StudentDashboard() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGigs();
  }, [searchQuery]);

  const loadGigs = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('gigs')
        .select(`
          *,
          mentor_profiles!inner (
            id,
            full_name,
            rating,
            completion_rate
          )
        `);

      if (searchQuery) {
        // Use array_overlap for better skill matching
        query = query.contains('skillset', [searchQuery.toLowerCase().trim()]);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error loading gigs:', error);
        return;
      }

      // Transform the data to match the Gig type
      const transformedGigs = data?.map(gig => ({
        ...gig,
        mentor_profiles: {
          ...gig.mentor_profiles,
          rating: gig.mentor_profiles.rating || 5.0,
          completion_rate: gig.mentor_profiles.completion_rate || 100
        }
      })) || [];

      setGigs(transformedGigs);
    } catch (error) {
      console.error('Error loading gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Mentor</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <StudentGigList gigs={gigs} loading={loading} />
      </main>
    </div>
  );
}
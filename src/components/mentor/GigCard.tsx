import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Clock } from 'lucide-react';
import { Gig } from '../../types/mentor';
import { Button } from '../Button';

interface GigCardProps {
  gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-shadow hover:shadow-lg">
      {gig.thumbnail_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={gig.thumbnail_url}
            alt={gig.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{gig.title}</h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{gig.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {gig.skillset.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => navigate(`/mentor/time-slots?gig=${gig.id}`)}
            variant="secondary"
          >
            <Clock className="h-4 w-4 mr-2" />
            Add Time Slots
          </Button>
          <Button
            onClick={() => navigate(`/mentor/gigs/${gig.id}/edit`)}
            variant="secondary"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Gig
          </Button>
        </div>
      </div>
    </div>
  );
}
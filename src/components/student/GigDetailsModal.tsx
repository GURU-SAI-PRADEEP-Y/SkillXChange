import React from 'react';
import { X, Star, Calendar } from 'lucide-react';
import { Gig } from '../../types/mentor';
import { Button } from '../Button';
import { BookingModal } from '../booking/BookingModal';

interface GigDetailsModalProps {
  gig: Gig;
  onClose: () => void;
}

export function GigDetailsModal({ gig, onClose }: GigDetailsModalProps) {
  const [showBooking, setShowBooking] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">{gig.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Media */}
            <div className="space-y-6">
              {gig.thumbnail_url && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={gig.thumbnail_url}
                    alt={gig.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {gig.video_url && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <video
                    src={gig.video_url}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">About this Gig</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{gig.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.skillset.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Mentor</p>
                    <p className="text-lg font-medium text-gray-900">
                      {gig.mentor_profiles?.full_name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium text-gray-900">
                      {gig.mentor_profiles?.rating?.toFixed(1) || '5.0'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-lg font-medium text-gray-900">
                      {gig.mentor_profiles?.completion_rate || 100}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-gray-900">${gig.price}</p>
                  </div>
                </div>

                <Button onClick={() => setShowBooking(true)} className="w-full">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal
          mentorId={gig.mentor_id}
          gigTitle={gig.title}
          onClose={() => setShowBooking(false)}
          onBookingComplete={() => {
            setShowBooking(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
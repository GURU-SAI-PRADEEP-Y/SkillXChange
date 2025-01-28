import React, { useState } from "react";
import { Star, Calendar } from "lucide-react";
import { Gig } from "../../types/mentor";
import { Button } from "../Button";
import { BookingModal } from "../booking/BookingModal";

interface StudentGigCardProps {
  gig: Gig;
}

export function StudentGigCard({ gig }: StudentGigCardProps) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-shadow hover:shadow-lg">
      {gig.thumbnail_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={gig.thumbnail_url}
            alt={gig.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-600">
              {gig.mentor_profiles?.rating?.toFixed(1) || "5.0"}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{gig.description}</p>

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

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Taught by</p>
            <p className="font-medium text-gray-900">
              {gig.mentor_profiles?.full_name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-xl font-bold text-gray-900">${gig.price}</p>
          </div>
        </div>

        <Button onClick={() => setShowBooking(true)}>
          <Calendar className="h-5 w-5 mr-2" />
          Book Session
        </Button>
      </div>

      {showBooking && (
        <BookingModal
          mentorId={gig.mentor_id}
          gigTitle={gig.title}
          onClose={() => setShowBooking(false)}
          onBookingComplete={() => {
            setShowBooking(false);
            // You could add a success toast here
          }}
        />
      )}
    </div>
  );
}

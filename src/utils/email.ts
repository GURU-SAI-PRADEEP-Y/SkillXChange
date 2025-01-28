import { supabase } from '../lib/supabase';
import { generateGoogleMeetLink } from './googleMeet';
import { generateStudentEmail, generateMentorEmail } from './emailTemplates';

interface BookingEmailProps {
  student_email: string;
  mentor_email: string;
  start_time: string;
  mentor_name: string;
  student_name: string;
  gig_title: string;
}

export async function sendBookingEmails(booking: BookingEmailProps) {
  try {
    const meetingLink = generateGoogleMeetLink();

    const emailData = {
      studentName: booking.student_name,
      mentorName: booking.mentor_name,
      startTime: booking.start_time,
      meetingLink,
      gigTitle: booking.gig_title,
    };

    // Send email to student
    await supabase.functions.invoke('send-email', {
      body: {
        to: booking.student_email,
        subject: 'Your Scheduled Session on SkillXchange',
        content: generateStudentEmail(emailData),
        contentType: 'text/html'
      }
    });

    // Send email to mentor
    await supabase.functions.invoke('send-email', {
      body: {
        to: booking.mentor_email,
        subject: 'Your Upcoming Mentorship Session on SkillXchange',
        content: generateMentorEmail(emailData),
        contentType: 'text/html'
      }
    });
  } catch (error) {
    console.error('Error sending booking emails:', error);
  }
}
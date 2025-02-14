# SkillXChange
This project is basically solves the issue for those students, who are not able to learn new technologies with expertise mentors. 

![Image](https://github.com/user-attachments/assets/d2319387-7856-48b6-9891-932d42ec4d7e)


I have added the landing page to user for knowing about my website to freelance properly.


I am using the SUPABASE for the database.

SUPABASE :

To connect the supabase, first you have to create a supabase account and create one organization ans name it.

And next create a tables to work with variable data in the website.

Now, to set the EDGE FUNCTION for the send_email :

![Image](https://github.com/user-attachments/assets/34162a3a-027d-4c43-b751-7fe5d1cdf2c7)

1) Install Supabase CLI locally:
npm install -g supabase

2) Login to Supabase CLI:
supabase login

3) Link your local project to your Supabase project:
supabase link --project-ref *********************

4) Create the Edge Function, if their is no edge function recently:
supabase functions new send-email

5) Deploy the function:
supabase functions deploy send-email --project-ref *********************

6) Set the RESEND_API_KEY secret in your Supabase project:
supabase secrets set RESEND_API_KEY=**************************** --project-ref *********************

7) After deploying, the function will be available at:
https://*********************.supabase.co/functions/v1/send-email




I am using RESEND as email provider.

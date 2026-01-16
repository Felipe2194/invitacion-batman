-- Add SELECT policy to allow reading RSVP responses
CREATE POLICY "Anyone can view RSVPs"
  ON public.rsvp_responses
  FOR SELECT
  USING (true);

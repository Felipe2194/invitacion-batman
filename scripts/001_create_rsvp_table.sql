-- Create RSVP responses table
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  response TEXT NOT NULL CHECK (response IN ('attending', 'not_attending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert responses (public RSVP form)
CREATE POLICY "Anyone can insert RSVP"
  ON public.rsvp_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to view all responses (you can make this more restrictive if needed)
CREATE POLICY "Anyone can view RSVPs"
  ON public.rsvp_responses
  FOR SELECT
  USING (true);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_created_at 
  ON public.rsvp_responses(created_at DESC);

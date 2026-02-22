-- Run this in Supabase SQL Editor to fix missing storage and settings
-- It uses "ON CONFLICT DO NOTHING" so it's safe to run even if things exist

-- 1. Create 'portfolio' storage bucket if it misses
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Policies (dropping first to avoid duplicates, then recreating)

-- Allow public read access (so everyone can see your images)
DROP POLICY IF EXISTS "Public read portfolio files" ON storage.objects;
CREATE POLICY "Public read portfolio files" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

-- Allow authenticated users (you) to upload
DROP POLICY IF EXISTS "Admin upload portfolio files" ON storage.objects;
CREATE POLICY "Admin upload portfolio files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Allow authenticated users (you) to update
DROP POLICY IF EXISTS "Admin update portfolio files" ON storage.objects;
CREATE POLICY "Admin update portfolio files" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Allow authenticated users (you) to delete
DROP POLICY IF EXISTS "Admin delete portfolio files" ON storage.objects;
CREATE POLICY "Admin delete portfolio files" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- 3. Default Site Settings (safe insert)
-- Using ON CONFLICT to avoid errors if rows exist
INSERT INTO public.site_settings (key, value)
VALUES 
  ('profile', '{"name":"Saiful Islam","title":"CSE Undergraduate • Developer • Problem Solver","bio":"Passionate Computer Science & Engineering student with a knack for building elegant solutions to complex problems.","email":"saiful1616.islam@gmail.com","phone":"+880 1707-224860","location":"Bangladesh","profileImage":"","resumeLink":""}'::jsonb),
  ('social_links', '{"github":"https://github.com/saiful16164","linkedin":"https://www.linkedin.com/in/saiful1616/"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

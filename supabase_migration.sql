-- Run this SQL in the Supabase SQL Editor: https://supabase.com/dashboard/project/dltbsieitucrivspdocg/sql/new
-- This creates all content tables for the admin panel

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  technologies TEXT[] DEFAULT '{}',
  github_link TEXT DEFAULT '',
  demo_link TEXT DEFAULT '',
  image TEXT DEFAULT '',
  status TEXT DEFAULT 'Ongoing' CHECK (status IN ('Completed','Ongoing')),
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Research table
CREATE TABLE public.research (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL DEFAULT '',
  publication_name TEXT DEFAULT '',
  pdf_link TEXT DEFAULT '',
  doi_link TEXT DEFAULT '',
  status TEXT DEFAULT 'In Progress' CHECK (status IN ('Published','Under Review','In Progress')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills table
CREATE TABLE public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Programming Languages','Technologies','Tools')),
  proficiency INT DEFAULT 50 CHECK (proficiency BETWEEN 0 AND 100),
  icon TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements table
CREATE TABLE public.achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('Competition','Hackathon','Award','Certification')),
  date TEXT DEFAULT '',
  link TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Published','Draft')),
  read_time TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site settings (key-value store)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ policies (anyone can read)
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read research" ON public.research FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public read published blogs" ON public.blog_posts FOR SELECT USING (status = 'Published');
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);

-- Admin WRITE policies (authenticated users only)
CREATE POLICY "Admin insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert research" ON public.research FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update research" ON public.research FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete research" ON public.research FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert skills" ON public.skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update skills" ON public.skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete skills" ON public.skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert achievements" ON public.achievements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update achievements" ON public.achievements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete achievements" ON public.achievements FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all blog_posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin insert settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read messages" ON public.messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update messages" ON public.messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete messages" ON public.messages FOR DELETE USING (auth.role() = 'authenticated');

-- Storage bucket for uploads (profile pics, project images)
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

CREATE POLICY "Public read portfolio files" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admin upload portfolio files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update portfolio files" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete portfolio files" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('profile', '{"name":"Saiful Islam","title":"CSE Undergraduate • Developer • Problem Solver","bio":"Passionate Computer Science & Engineering student with a knack for building elegant solutions to complex problems.","email":"saiful1616.islam@gmail.com","phone":"+880 1707-224860","location":"Bangladesh","profileImage":"","resumeLink":""}'::jsonb),
  ('social_links', '{"github":"https://github.com/saiful16164","linkedin":"https://www.linkedin.com/in/saiful1616/"}'::jsonb);

-- BEAM Education Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cities table
CREATE TABLE cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  programs_count INTEGER DEFAULT 0,
  classes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructors table
CREATE TABLE instructors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  expertise TEXT[],
  education TEXT,
  experience TEXT,
  city_id UUID REFERENCES cities(id),
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  total_classes INTEGER DEFAULT 0,
  specializations TEXT[],
  languages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table
CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('Academic', 'Social Work')),
  level TEXT,
  duration TEXT,
  city_id UUID REFERENCES cities(id),
  instructor_id UUID REFERENCES instructors(id),
  max_students INTEGER,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table
CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  program_id UUID REFERENCES programs(id),
  instructor_id UUID REFERENCES instructors(id),
  city_id UUID REFERENCES cities(id),
  schedule TEXT,
  time TEXT,
  start_date DATE,
  end_date DATE,
  max_students INTEGER,
  enrolled_students INTEGER DEFAULT 0,
  price DECIMAL(10,2),
  status TEXT CHECK (status IN ('active', 'full', 'completed', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donations table
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT CHECK (type IN ('one-time', 'monthly')),
  message TEXT,
  stripe_payment_intent_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create milestones table
CREATE TABLE milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  achievement TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_instructors_city_id ON instructors(city_id);
CREATE INDEX idx_programs_city_id ON programs(city_id);
CREATE INDEX idx_programs_category ON programs(category);
CREATE INDEX idx_classes_city_id ON classes(city_id);
CREATE INDEX idx_classes_status ON classes(status);
CREATE INDEX idx_classes_start_date ON classes(start_date);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_created_at ON donations(created_at);

-- Insert sample cities data
INSERT INTO cities (name, state, programs_count, classes_count) VALUES
('New York City', 'NY', 24, 156),
('Los Angeles', 'CA', 18, 128),
('Chicago', 'IL', 15, 98),
('Miami', 'FL', 12, 76),
('Seattle', 'WA', 10, 64),
('Austin', 'TX', 8, 52),
('Denver', 'CO', 7, 45),
('Atlanta', 'GA', 9, 58);

-- Insert sample instructors data
INSERT INTO instructors (name, title, bio, expertise, education, experience, city_id, rating, total_students, total_classes, specializations, languages) VALUES
(
  'Dr. Sarah Chen',
  'Senior Computer Science Instructor',
  'Dr. Chen is a passionate educator with expertise in modern programming languages and software development. She has helped hundreds of students transition into tech careers.',
  ARRAY['Python Programming', 'Data Science', 'Web Development'],
  'Ph.D. Computer Science, MIT',
  '8+ years',
  (SELECT id FROM cities WHERE name = 'New York City'),
  4.9,
  1247,
  45,
  ARRAY['Academic', 'Technology'],
  ARRAY['English', 'Mandarin']
),
(
  'Dr. Michael Rodriguez',
  'Clinical Social Worker & Mental Health Specialist',
  'Dr. Rodriguez specializes in community mental health and has developed innovative programs for underserved populations across Los Angeles.',
  ARRAY['Mental Health First Aid', 'Crisis Intervention', 'Community Outreach'],
  'Ph.D. Social Work, UCLA',
  '12+ years',
  (SELECT id FROM cities WHERE name = 'Los Angeles'),
  4.8,
  892,
  32,
  ARRAY['Social Work', 'Mental Health'],
  ARRAY['English', 'Spanish']
),
(
  'Prof. Emily Watson',
  'Creative Writing & Literature Professor',
  'Prof. Watson is an award-winning author and educator who inspires students to find their unique voice through creative expression.',
  ARRAY['Creative Writing', 'Poetry', 'Literature Analysis'],
  'MFA Creative Writing, Columbia University',
  '6+ years',
  (SELECT id FROM cities WHERE name = 'Chicago'),
  4.7,
  756,
  28,
  ARRAY['Academic', 'Arts & Humanities'],
  ARRAY['English']
),
(
  'Coach James Wilson',
  'Youth Development & Leadership Coach',
  'Coach Wilson has dedicated his career to empowering young people and building strong community leaders through innovative youth programs.',
  ARRAY['Leadership Training', 'Youth Mentoring', 'Community Engagement'],
  'M.S. Youth Development, University of Miami',
  '10+ years',
  (SELECT id FROM cities WHERE name = 'Miami'),
  4.6,
  634,
  22,
  ARRAY['Social Work', 'Youth Development'],
  ARRAY['English', 'Spanish']
);

-- Insert sample programs data
INSERT INTO programs (title, description, category, level, duration, city_id, instructor_id, max_students, price) VALUES
(
  'Advanced Python Programming',
  'Master advanced Python concepts including data structures, algorithms, and web development.',
  'Academic',
  'Advanced',
  '12 weeks',
  (SELECT id FROM cities WHERE name = 'New York City'),
  (SELECT id FROM instructors WHERE name = 'Dr. Sarah Chen'),
  25,
  299.00
),
(
  'Community Mental Health First Aid',
  'Learn to recognize and respond to mental health crises in your community.',
  'Social Work',
  'Intermediate',
  '8 weeks',
  (SELECT id FROM cities WHERE name = 'Los Angeles'),
  (SELECT id FROM instructors WHERE name = 'Dr. Michael Rodriguez'),
  30,
  199.00
),
(
  'Creative Writing Workshop',
  'Develop your creative voice through poetry, short stories, and personal essays.',
  'Academic',
  'All Levels',
  '10 weeks',
  (SELECT id FROM cities WHERE name = 'Chicago'),
  (SELECT id FROM instructors WHERE name = 'Prof. Emily Watson'),
  20,
  249.00
),
(
  'Youth Leadership Development',
  'Build leadership skills, confidence, and community engagement abilities.',
  'Social Work',
  'Teen to Young Adult',
  '16 weeks',
  (SELECT id FROM cities WHERE name = 'Miami'),
  (SELECT id FROM instructors WHERE name = 'Coach James Wilson'),
  18,
  349.00
);

-- Insert sample classes data
INSERT INTO classes (title, description, program_id, instructor_id, city_id, schedule, time, start_date, end_date, max_students, enrolled_students, price, status) VALUES
(
  'Advanced Python Programming',
  'Master advanced Python concepts including data structures, algorithms, and web development.',
  (SELECT id FROM programs WHERE title = 'Advanced Python Programming'),
  (SELECT id FROM instructors WHERE name = 'Dr. Sarah Chen'),
  (SELECT id FROM cities WHERE name = 'New York City'),
  'Mondays & Wednesdays',
  '6:00 PM - 8:00 PM',
  '2024-01-15',
  '2024-04-15',
  25,
  18,
  299.00,
  'active'
),
(
  'Community Mental Health First Aid',
  'Learn to recognize and respond to mental health crises in your community.',
  (SELECT id FROM programs WHERE title = 'Community Mental Health First Aid'),
  (SELECT id FROM instructors WHERE name = 'Dr. Michael Rodriguez'),
  (SELECT id FROM cities WHERE name = 'Los Angeles'),
  'Tuesdays & Thursdays',
  '7:00 PM - 9:00 PM',
  '2024-01-20',
  '2024-03-20',
  30,
  22,
  199.00,
  'active'
),
(
  'Creative Writing Workshop',
  'Develop your creative voice through poetry, short stories, and personal essays.',
  (SELECT id FROM programs WHERE title = 'Creative Writing Workshop'),
  (SELECT id FROM instructors WHERE name = 'Prof. Emily Watson'),
  (SELECT id FROM cities WHERE name = 'Chicago'),
  'Fridays',
  '4:00 PM - 6:00 PM',
  '2024-01-25',
  '2024-04-05',
  20,
  15,
  249.00,
  'active'
),
(
  'Youth Leadership Development',
  'Build leadership skills, confidence, and community engagement abilities.',
  (SELECT id FROM programs WHERE title = 'Youth Leadership Development'),
  (SELECT id FROM instructors WHERE name = 'Coach James Wilson'),
  (SELECT id FROM cities WHERE name = 'Miami'),
  'Saturdays',
  '10:00 AM - 12:00 PM',
  '2024-02-01',
  '2024-05-25',
  18,
  12,
  349.00,
  'active'
);

-- Insert sample milestones data
INSERT INTO milestones (year, title, description, achievement, icon) VALUES
('2018', 'BEAM Education Founded', 'Started with a vision to bridge educational gaps in underserved communities', '1 city, 3 programs, 50 students', 'heart'),
('2019', 'First Expansion', 'Expanded to 3 cities and launched our first social work programs', '3 cities, 8 programs, 200+ students', 'map-pin'),
('2020', 'Digital Transformation', 'Launched online learning platforms and virtual community programs', '5 cities, 15 programs, 500+ students', 'target'),
('2021', 'Community Impact Recognition', 'Received national recognition for community development programs', '8 cities, 25 programs, 1,000+ students', 'award'),
('2022', 'Instructor Excellence Program', 'Launched comprehensive training program for educators and social workers', '12 cities, 40 programs, 1,500+ students', 'users'),
('2023', 'National Scale Achievement', 'Reached 20+ cities and established partnerships with major institutions', '20+ cities, 60+ programs, 2,500+ students', 'trophy');

-- Enable Row Level Security (RLS)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Allow public read access to instructors" ON instructors FOR SELECT USING (true);
CREATE POLICY "Allow public read access to programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access to classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to milestones" ON milestones FOR SELECT USING (true);

-- Create policies for donation creation
CREATE POLICY "Allow public to create donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to donations" ON donations FOR SELECT USING (true);

-- Update city counts based on actual data
UPDATE cities SET 
  programs_count = (SELECT COUNT(*) FROM programs WHERE city_id = cities.id),
  classes_count = (SELECT COUNT(*) FROM classes WHERE city_id = cities.id);

-- Create a function to increment enrolled students
CREATE OR REPLACE FUNCTION increment_enrolled_students(class_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE classes 
  SET enrolled_students = enrolled_students + 1 
  WHERE id = class_id;
END;
$$ LANGUAGE plpgsql;

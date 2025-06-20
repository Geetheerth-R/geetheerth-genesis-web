
-- Create users table for authentication
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" 
  ON public.users 
  FOR SELECT 
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" 
  ON public.users 
  FOR UPDATE 
  USING (id = auth.uid());

-- RLS Policies for services table (public read access)
CREATE POLICY "Anyone can view active services" 
  ON public.services 
  FOR SELECT 
  USING (is_active = true);

-- RLS Policies for bookings table
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Insert sample services
INSERT INTO public.services (name, description, price, duration_hours) VALUES
('Web Development', 'Full-stack web application development using modern technologies like React, Node.js, and databases', 1500.00, 40),
('IoT Projects', 'Internet of Things solutions including sensor integration, data collection, and real-time monitoring systems', 2000.00, 50),
('AI Projects', 'Machine Learning and AI solutions including data analysis, predictive models, and automation systems', 2500.00, 60),
('Mobile App Development', 'Cross-platform mobile application development for iOS and Android', 1800.00, 45),
('Database Design & Optimization', 'Database architecture, optimization, and migration services', 800.00, 20),
('Technical Consulting', 'Technical consultation and architecture planning for complex projects', 150.00, 2);

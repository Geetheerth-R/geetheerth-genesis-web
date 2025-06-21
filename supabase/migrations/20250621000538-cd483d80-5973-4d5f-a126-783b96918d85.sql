
-- Update existing services and remove unwanted ones
UPDATE public.services 
SET 
  name = 'Technical Consulting',
  description = 'Professional technical consultation and guidance for your projects',
  price = 99.00,
  duration_hours = 0.25
WHERE name = 'Technical Consulting';

UPDATE public.services 
SET 
  name = 'Web App Development',
  description = 'Full-stack web application development using modern technologies',
  price = 2199.00,
  duration_hours = 0
WHERE name = 'Web Development';

UPDATE public.services 
SET 
  name = 'IoT Projects',
  description = 'Internet of Things solutions with hardware integration',
  price = 2000.00,
  duration_hours = 0
WHERE name = 'IoT Projects';

UPDATE public.services 
SET 
  name = 'AI Projects',
  description = 'Machine Learning and AI solutions for your business needs',
  price = 1999.00,
  duration_hours = 0
WHERE name = 'AI Projects';

-- Remove unwanted services
DELETE FROM public.services 
WHERE name IN ('Mobile App Development', 'Database Design & Optimization');

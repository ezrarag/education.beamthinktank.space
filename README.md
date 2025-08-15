# BEAM Education Site

A comprehensive education platform that connects learners with expert instructors across multiple cities, offering both academic and social work programs. Built with Next.js, Supabase, and Stripe.

## 🚀 Features

### Core Functionality
- **City Selector**: Choose your location to see relevant programs and classes
- **Academic Programs**: STEM education, language arts, advanced placement courses
- **Social Work Programs**: Community outreach, mental health support, youth development
- **Class Management**: Browse, enroll, and manage course schedules
- **Instructor Profiles**: Expert educators with detailed backgrounds and ratings
- **Donation System**: Support programs with one-time or recurring donations
- **Milestones Tracking**: View organizational growth and achievements

### Technical Features
- **Modern UI/UX**: Responsive design with smooth animations
- **Real-time Updates**: Live enrollment tracking and availability
- **Secure Payments**: Stripe integration for course fees and donations
- **Database Management**: Supabase for data storage and authentication
- **Performance Optimized**: Next.js 14 with app router and server components

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd beam-education-site
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Supabase Setup

1. Create a new Supabase project
2. Run the following SQL to create the database schema:

```sql
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

-- Insert sample data
INSERT INTO cities (name, state, programs_count, classes_count) VALUES
('New York City', 'NY', 24, 156),
('Los Angeles', 'CA', 18, 128),
('Chicago', 'IL', 15, 98),
('Miami', 'FL', 12, 76),
('Seattle', 'WA', 10, 64),
('Austin', 'TX', 8, 52),
('Denver', 'CO', 7, 45),
('Atlanta', 'GA', 9, 58);
```

### 5. Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up webhook endpoints pointing to `/api/webhooks/stripe`
4. Configure webhook events for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
beam-education-site/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # Context providers
├── components/             # React components
│   ├── Hero.tsx           # Hero section
│   ├── CitySelector.tsx   # City selection
│   ├── ProgramsOverview.tsx # Programs showcase
│   ├── FeaturedClasses.tsx # Featured classes
│   ├── InstructorsSection.tsx # Instructors showcase
│   ├── DonationSection.tsx # Donation system
│   ├── MilestonesSection.tsx # Achievements timeline
│   └── LoadingSpinner.tsx # Loading component
├── lib/                    # Utility libraries
│   ├── supabase.ts        # Supabase client & queries
│   └── stripe.ts          # Stripe integration
├── public/                 # Static assets
└── package.json            # Dependencies
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom color schemes and components. Custom styles are defined in `app/globals.css`.

### Framer Motion
Smooth animations and transitions are powered by Framer Motion throughout the application.

### TypeScript
Full TypeScript support with strict type checking and comprehensive interfaces.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 📱 Responsive Design

The site is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Environment variable protection
- Stripe webhook signature verification
- Supabase Row Level Security (RLS)
- Input validation and sanitization
- Secure payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- User authentication and profiles
- Advanced search and filtering
- Real-time chat support
- Mobile app development
- Analytics dashboard
- Multi-language support
- Advanced reporting tools

---

Built with ❤️ by the BEAM Education team

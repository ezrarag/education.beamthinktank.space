import { getPropertyBySlug } from '@/lib/properties';
import { notFound } from 'next/navigation';

interface PropertyPageProps {
  params: {
    slug: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Image */}
      <div className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${property.imageUrl || 'https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg'})`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{property.title}</h1>
            <p className="text-xl text-gray-300">BEAM Education Site</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Status Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Status</h2>
              <div className="bg-white/10 rounded-lg p-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  property.status === 'Proposed' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {property.status}
                </span>
              </div>
            </div>

            {/* Programs Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Programs</h2>
              <div className="bg-white/10 rounded-lg p-6">
                <ul className="space-y-3">
                  {property.programs.map((program, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Community Impact</h2>
            <div className="space-y-6">
              {/* Parents */}
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">Parents</h3>
                <ul className="space-y-2">
                  {property.communityImpact.parents.map((impact, index) => (
                    <li key={index} className="text-gray-300 text-sm">• {impact}</li>
                  ))}
                </ul>
              </div>

              {/* Students */}
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">Students</h3>
                <ul className="space-y-2">
                  {property.communityImpact.students.map((impact, index) => (
                    <li key={index} className="text-gray-300 text-sm">• {impact}</li>
                  ))}
                </ul>
              </div>

              {/* Community Organizations */}
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">Community Organizations</h3>
                <ul className="space-y-2">
                  {property.communityImpact.communityOrgs.map((impact, index) => (
                    <li key={index} className="text-gray-300 text-sm">• {impact}</li>
                  ))}
                </ul>
              </div>

              {/* Institutions */}
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">Institutions</h3>
                <ul className="space-y-2">
                  {property.communityImpact.institutions.map((impact, index) => (
                    <li key={index} className="text-gray-300 text-sm">• {impact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-medium rounded-full hover:bg-yellow-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

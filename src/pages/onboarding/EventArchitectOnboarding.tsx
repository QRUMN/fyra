import React, { useState } from 'react';
import { Calendar, Users, Sparkles, DollarSign, Share2, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  companyName: string;
  description: string;
  eventTypes: string[];
  specialties: string[];
  portfolio: {
    title: string;
    description: string;
    date: string;
    attendees: string;
    photos: string[];
  }[];
  pricing: {
    baseRate: string;
    includedServices: string[];
  };
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
}

const EVENT_TYPES = [
  'Concerts',
  'Club Nights',
  'Private Parties',
  'Corporate Events',
  'Festivals',
  'Pop-ups',
  'Art Shows',
  'Fashion Shows'
];

const SPECIALTIES = [
  'Sound Design',
  'Lighting',
  'Stage Design',
  'VIP Experience',
  'Crowd Management',
  'Talent Booking',
  'Marketing',
  'Security'
];

export default function EventArchitectOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    description: '',
    eventTypes: [],
    specialties: [],
    portfolio: [],
    pricing: {
      baseRate: '',
      includedServices: []
    },
    socialLinks: {}
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    navigate('/dashboard');
  };

  const steps = [
    { icon: <Sparkles size={20} />, label: 'Basic Info' },
    { icon: <Calendar size={20} />, label: 'Event Types' },
    { icon: <Users size={20} />, label: 'Specialties' },
    { icon: <DollarSign size={20} />, label: 'Pricing' },
    { icon: <Share2 size={20} />, label: 'Portfolio' },
    { icon: <Upload size={20} />, label: 'Media' }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                placeholder="Your company name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                rows={4}
                placeholder="Tell us about your company and experience"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Event Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EVENT_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.eventTypes.includes(type)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...formData.eventTypes, type]
                          : formData.eventTypes.filter(t => t !== type);
                        updateFormData('eventTypes', newTypes);
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Specialties
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALTIES.map((specialty) => (
                  <label key={specialty} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={(e) => {
                        const newSpecialties = e.target.checked
                          ? [...formData.specialties, specialty]
                          : formData.specialties.filter(s => s !== specialty);
                        updateFormData('specialties', newSpecialties);
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Base Rate (per event)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.pricing.baseRate}
                  onChange={(e) => updateFormData('pricing', {
                    ...formData.pricing,
                    baseRate: e.target.value
                  })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                  placeholder="Base rate per event"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Included Services
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALTIES.map((service) => (
                  <label key={service} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pricing.includedServices.includes(service)}
                      onChange={(e) => {
                        const newServices = e.target.checked
                          ? [...formData.pricing.includedServices, service]
                          : formData.pricing.includedServices.filter(s => s !== service);
                        updateFormData('pricing', {
                          ...formData.pricing,
                          includedServices: newServices
                        });
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Portfolio
              </label>
              <button
                onClick={() => {
                  const newPortfolio = [
                    ...formData.portfolio,
                    {
                      title: '',
                      description: '',
                      date: '',
                      attendees: '',
                      photos: []
                    }
                  ];
                  updateFormData('portfolio', newPortfolio);
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-accent dark:hover:border-accent transition-colors"
              >
                Add Event
              </button>
              {formData.portfolio.map((event, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => {
                      const newPortfolio = [...formData.portfolio];
                      newPortfolio[index].title = e.target.value;
                      updateFormData('portfolio', newPortfolio);
                    }}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="Event title"
                  />
                  <textarea
                    value={event.description}
                    onChange={(e) => {
                      const newPortfolio = [...formData.portfolio];
                      newPortfolio[index].description = e.target.value;
                      updateFormData('portfolio', newPortfolio);
                    }}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    rows={2}
                    placeholder="Event description"
                  />
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) => {
                        const newPortfolio = [...formData.portfolio];
                        newPortfolio[index].date = e.target.value;
                        updateFormData('portfolio', newPortfolio);
                      }}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="number"
                      value={event.attendees}
                      onChange={(e) => {
                        const newPortfolio = [...formData.portfolio];
                        newPortfolio[index].attendees = e.target.value;
                        updateFormData('portfolio', newPortfolio);
                      }}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                      placeholder="Attendees"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Social Links
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">instagram.com/</span>
                  <input
                    type="text"
                    value={formData.socialLinks.instagram || ''}
                    onChange={(e) => updateFormData('socialLinks', {
                      ...formData.socialLinks,
                      instagram: e.target.value,
                    })}
                    className="w-full pl-28 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="username"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">linkedin.com/in/</span>
                  <input
                    type="text"
                    value={formData.socialLinks.linkedin || ''}
                    onChange={(e) => updateFormData('socialLinks', {
                      ...formData.socialLinks,
                      linkedin: e.target.value,
                    })}
                    className="w-full pl-32 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="profile"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">https://</span>
                  <input
                    type="text"
                    value={formData.socialLinks.website || ''}
                    onChange={(e) => updateFormData('socialLinks', {
                      ...formData.socialLinks,
                      website: e.target.value,
                    })}
                    className="w-full pl-16 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="your-website.com"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i + 1 === step
                      ? 'bg-accent text-white'
                      : i + 1 < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {s.icon}
                </div>
                <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute left-0 top-1/2 h-0.5 bg-gray-200 dark:bg-gray-700 w-full -translate-y-1/2" />
            <div
              className="absolute left-0 top-1/2 h-0.5 bg-accent w-full -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {steps[step - 1].label}
          </h2>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className={`px-6 py-2 rounded-lg font-medium ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg font-medium bg-accent text-white hover:bg-accent/90"
          >
            {step === steps.length ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Music2, Upload, Calendar, DollarSign, Mic2, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  artistName: string;
  genres: string[];
  bio: string;
  equipment: string[];
  socialLinks: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
  };
  ratePerHour: string;
  availability: {
    [key: string]: boolean;
  };
  profileImage: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const GENRES = ['House', 'Techno', 'Hip-Hop', 'R&B', 'Latin', 'Pop', 'Dance', 'Afrobeat'];
const EQUIPMENT = ['CDJs', 'Turntables', 'Controller', 'Mixer', 'Laptop', 'Microphone', 'Monitors'];

export default function ArtistOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    artistName: '',
    genres: [],
    bio: '',
    equipment: [],
    socialLinks: {},
    ratePerHour: '',
    availability: {},
    profileImage: '',
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
    { icon: <Mic2 size={20} />, label: 'Basic Info' },
    { icon: <Music2 size={20} />, label: 'Genres' },
    { icon: <Calendar size={20} />, label: 'Equipment' },
    { icon: <DollarSign size={20} />, label: 'Rates' },
    { icon: <Share2 size={20} />, label: 'Social' },
    { icon: <Upload size={20} />, label: 'Photo' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Artist/DJ Name
              </label>
              <input
                type="text"
                value={formData.artistName}
                onChange={(e) => updateFormData('artistName', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                placeholder="Your stage name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                rows={4}
                placeholder="Tell us about your style and experience"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Music Genres
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GENRES.map((genre) => (
                  <label key={genre} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.genres.includes(genre)}
                      onChange={(e) => {
                        const newGenres = e.target.checked
                          ? [...formData.genres, genre]
                          : formData.genres.filter(g => g !== genre);
                        updateFormData('genres', newGenres);
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{genre}</span>
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
                Equipment
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EQUIPMENT.map((item) => (
                  <label key={item} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.equipment.includes(item)}
                      onChange={(e) => {
                        const newEquipment = e.target.checked
                          ? [...formData.equipment, item]
                          : formData.equipment.filter(eq => eq !== item);
                        updateFormData('equipment', newEquipment);
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{item}</span>
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
                Rate per Hour
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.ratePerHour}
                  onChange={(e) => updateFormData('ratePerHour', e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                  placeholder="150"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DAYS.map((day) => (
                  <label key={day} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availability[day] || false}
                      onChange={(e) => {
                        updateFormData('availability', {
                          ...formData.availability,
                          [day]: e.target.checked,
                        });
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{day}</span>
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
                  <span className="absolute left-3 top-2 text-gray-500">soundcloud.com/</span>
                  <input
                    type="text"
                    value={formData.socialLinks.soundcloud || ''}
                    onChange={(e) => updateFormData('socialLinks', {
                      ...formData.socialLinks,
                      soundcloud: e.target.value,
                    })}
                    className="w-full pl-28 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="username"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">spotify.com/artist/</span>
                  <input
                    type="text"
                    value={formData.socialLinks.spotify || ''}
                    onChange={(e) => updateFormData('socialLinks', {
                      ...formData.socialLinks,
                      spotify: e.target.value,
                    })}
                    className="w-full pl-36 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="id"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Profile Image
              </label>
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent dark:hover:border-accent transition-colors">
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop your image here, or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateFormData('profileImage', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {formData.profileImage && (
                <div className="mt-4">
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                </div>
              )}
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
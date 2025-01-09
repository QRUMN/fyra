import React, { useState } from 'react';
import { Building2, MapPin, Clock, DollarSign, Camera, Upload, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  venueName: string;
  address: string;
  capacity: string;
  description: string;
  amenities: string[];
  hours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  coverCharge: string;
  photos: string[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const AMENITIES = [
  'Dance Floor',
  'VIP Section',
  'Full Bar',
  'Smoking Area',
  'Coat Check',
  'Security',
  'Sound System',
  'Stage',
  'Parking',
  'Kitchen'
];

export default function HotspotOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    venueName: '',
    address: '',
    capacity: '',
    description: '',
    amenities: [],
    hours: {},
    coverCharge: '',
    photos: [],
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
    { icon: <Building2 size={20} />, label: 'Basic Info' },
    { icon: <MapPin size={20} />, label: 'Location' },
    { icon: <Users size={20} />, label: 'Amenities' },
    { icon: <Clock size={20} />, label: 'Hours' },
    { icon: <DollarSign size={20} />, label: 'Pricing' },
    { icon: <Camera size={20} />, label: 'Photos' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Venue Name
              </label>
              <input
                type="text"
                value={formData.venueName}
                onChange={(e) => updateFormData('venueName', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                placeholder="Your venue name"
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
                placeholder="Tell us about your venue"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => updateFormData('capacity', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                placeholder="Maximum venue capacity"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                placeholder="Street address"
              />
            </div>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {/* Map component would go here */}
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                Map Preview
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        const newAmenities = e.target.checked
                          ? [...formData.amenities, amenity]
                          : formData.amenities.filter(a => a !== amenity);
                        updateFormData('amenities', newAmenities);
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{amenity}</span>
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
                Operating Hours
              </label>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-24 text-sm">{day}</span>
                    <input
                      type="time"
                      value={formData.hours[day]?.open || ''}
                      onChange={(e) => updateFormData('hours', {
                        ...formData.hours,
                        [day]: { ...formData.hours[day], open: e.target.value },
                      })}
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={formData.hours[day]?.close || ''}
                      onChange={(e) => updateFormData('hours', {
                        ...formData.hours,
                        [day]: { ...formData.hours[day], close: e.target.value },
                      })}
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                  </div>
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
                Cover Charge
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.coverCharge}
                  onChange={(e) => updateFormData('coverCharge', e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                  placeholder="0"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Leave at 0 if no cover charge
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Venue Photos
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="aspect-square relative flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent dark:hover:border-accent transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const newPhotos = [...formData.photos];
                            newPhotos[index - 1] = reader.result as string;
                            updateFormData('photos', newPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {formData.photos[index - 1] && (
                      <img
                        src={formData.photos[index - 1]}
                        alt={`Venue photo ${index}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
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
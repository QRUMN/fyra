import React, { useState } from 'react';
import { Car, Shield, Clock, DollarSign, MapPin, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  fullName: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
  };
  documents: {
    driversLicense: string;
    insurance: string;
    backgroundCheck: string;
  };
  availability: {
    [key: string]: boolean;
  };
  serviceAreas: string[];
  ratePerMile: string;
  profilePhoto: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SERVICE_AREAS = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island',
  'Jersey City',
  'Hoboken',
  'Newark'
];

export default function NavigatorOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    vehicleInfo: {
      make: '',
      model: '',
      year: '',
      color: '',
      licensePlate: ''
    },
    documents: {
      driversLicense: '',
      insurance: '',
      backgroundCheck: ''
    },
    availability: {},
    serviceAreas: [],
    ratePerMile: '',
    profilePhoto: ''
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
    { icon: <Car size={20} />, label: 'Basic Info' },
    { icon: <Shield size={20} />, label: 'Documents' },
    { icon: <Clock size={20} />, label: 'Availability' },
    { icon: <MapPin size={20} />, label: 'Areas' },
    { icon: <DollarSign size={20} />, label: 'Rates' },
    { icon: <Upload size={20} />, label: 'Photo' }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Make
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleInfo.make}
                    onChange={(e) => updateFormData('vehicleInfo', {
                      ...formData.vehicleInfo,
                      make: e.target.value
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="Vehicle make"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleInfo.model}
                    onChange={(e) => updateFormData('vehicleInfo', {
                      ...formData.vehicleInfo,
                      model: e.target.value
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="Vehicle model"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleInfo.year}
                    onChange={(e) => updateFormData('vehicleInfo', {
                      ...formData.vehicleInfo,
                      year: e.target.value
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="Vehicle year"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleInfo.color}
                    onChange={(e) => updateFormData('vehicleInfo', {
                      ...formData.vehicleInfo,
                      color: e.target.value
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                    placeholder="Vehicle color"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  License Plate
                </label>
                <input
                  type="text"
                  value={formData.vehicleInfo.licensePlate}
                  onChange={(e) => updateFormData('vehicleInfo', {
                    ...formData.vehicleInfo,
                    licensePlate: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                  placeholder="License plate number"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Driver's License
                </label>
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent dark:hover:border-accent transition-colors">
                  <Upload size={24} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Upload Driver's License
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateFormData('documents', {
                            ...formData.documents,
                            driversLicense: reader.result as string
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Insurance
                </label>
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent dark:hover:border-accent transition-colors">
                  <Upload size={24} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Upload Insurance Document
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateFormData('documents', {
                            ...formData.documents,
                            insurance: reader.result as string
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Background Check Authorization
                </label>
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent dark:hover:border-accent transition-colors">
                  <Upload size={24} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Upload Authorization Form
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateFormData('documents', {
                            ...formData.documents,
                            backgroundCheck: reader.result as string
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Availability
              </label>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-200">{day}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.availability[day] || false}
                        onChange={(e) => {
                          updateFormData('availability', {
                            ...formData.availability,
                            [day]: e.target.checked
                          });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                    </label>
                  </div>
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
                Service Areas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_AREAS.map((area) => (
                  <label key={area} className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.serviceAreas.includes(area)}
                      onChange={(e) => {
                        const newAreas = e.target.checked
                          ? [...formData.serviceAreas, area]
                          : formData.serviceAreas.filter(a => a !== area);
                        updateFormData('serviceAreas', newAreas);
                      }}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span className="text-sm">{area}</span>
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
                Rate per Mile
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.ratePerMile}
                  onChange={(e) => updateFormData('ratePerMile', e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Profile Photo
              </label>
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent dark:hover:border-accent transition-colors">
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload a professional photo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateFormData('profilePhoto', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {formData.profilePhoto && (
                <div className="mt-4">
                  <img
                    src={formData.profilePhoto}
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
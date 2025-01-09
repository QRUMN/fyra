import React, { useState } from 'react';
import {
  Book,
  Video,
  Award,
  CheckCircle,
  Clock,
  PlayCircle,
  FileText,
  Star,
  Lock,
  BarChart,
  ChevronRight,
  Medal,
  Trophy,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  modules: {
    id: string;
    title: string;
    type: 'video' | 'quiz' | 'reading';
    duration: number;
    completed: boolean;
    locked: boolean;
  }[];
  certification: {
    name: string;
    validUntil: string;
    badge: string;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  reward: string;
  unlocked: boolean;
}

export default function DriverTraining() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'required' | 'optional'>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Safe Driving Fundamentals',
      description: 'Master the essentials of safe and professional driving',
      duration: 120,
      level: 'beginner',
      progress: 75,
      modules: [
        {
          id: 'm1',
          title: 'Introduction to Safe Driving',
          type: 'video',
          duration: 15,
          completed: true,
          locked: false,
        },
        {
          id: 'm2',
          title: 'Defensive Driving Techniques',
          type: 'video',
          duration: 20,
          completed: true,
          locked: false,
        },
        {
          id: 'm3',
          title: 'Weather Conditions',
          type: 'reading',
          duration: 10,
          completed: false,
          locked: false,
        },
        {
          id: 'm4',
          title: 'Safety Assessment',
          type: 'quiz',
          duration: 15,
          completed: false,
          locked: true,
        },
      ],
      certification: {
        name: 'Safe Driver Certification',
        validUntil: '2026-01-09',
        badge: '🏆',
      },
    },
    // More courses...
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Safety Champion',
      description: 'Maintain a perfect safety score for 30 days',
      icon: '🛡️',
      progress: 80,
      reward: 'Premium Badge',
      unlocked: false,
    },
    // More achievements...
  ];

  const renderModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'quiz':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'reading':
        return <Book className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Driver Training
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enhance your skills and earn certifications
            </p>
          </div>

          <div className="flex gap-2">
            {(['all', 'required', 'optional'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'beginner'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                        : course.level === 'intermediate'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {course.duration} min
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p>

                <div className="space-y-4">
                  <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {course.progress}% Complete
                    </span>
                    <span className="text-blue-500">
                      {course.modules.filter((m) => m.completed).length}/
                      {course.modules.length} Modules
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 p-4">
                <button
                  onClick={() => setSelectedCourse(course.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {course.progress === 100 ? (
                    <>
                      <Award className="w-5 h-5" />
                      View Certificate
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5" />
                      Continue Learning
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  achievement.unlocked
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      achievement.unlocked
                        ? 'bg-blue-100 dark:bg-blue-900/40'
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.unlocked ? 'Unlocked' : `${achievement.progress}%`}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {achievement.description}
                </p>
                {!achievement.unlocked && (
                  <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Your Certifications
          </h3>
          <div className="space-y-4">
            {courses
              .filter((course) => course.progress === 100)
              .map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{course.certification.badge}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {course.certification.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Valid until {new Date(course.certification.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    Download
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignUpForm = z.infer<typeof schema>;

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signUp(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white dark:bg-brand-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-brand-dark/50 rounded-2xl shadow-card dark:shadow-card-dark p-8">
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">Create an Account</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark dark:text-white mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark focus:ring-2 focus:ring-brand-lime"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark dark:text-white mb-1">
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark focus:ring-2 focus:ring-brand-lime"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark dark:text-white mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark focus:ring-2 focus:ring-brand-lime"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-lime hover:bg-brand-lime/90 text-brand-dark font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-brand-dark dark:text-white">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-brand-red hover:text-brand-red/80 dark:text-brand-lime dark:hover:text-brand-lime/80 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
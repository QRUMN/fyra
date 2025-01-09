import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const schema = z.object({
  email: z.string().email('Invalid email address')
});

type ResetPasswordForm = z.infer<typeof schema>;

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white dark:bg-brand-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-brand-dark/50 rounded-2xl shadow-card dark:shadow-card-dark p-8">
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">Reset Password</h2>
          
          {success ? (
            <div className="text-center">
              <p className="text-green-500 mb-4">
                Password reset email sent! Check your inbox for further instructions.
              </p>
              <Link 
                to="/login"
                className="text-brand-red hover:text-brand-red/80 dark:text-brand-lime dark:hover:text-brand-lime/80 font-medium"
              >
                Return to login
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                className="w-full bg-brand-lime hover:bg-brand-lime/90 text-brand-dark font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Send Reset Link
              </button>

              <div className="text-center mt-4">
                <Link 
                  to="/login"
                  className="text-brand-red hover:text-brand-red/80 dark:text-brand-lime dark:hover:text-brand-lime/80 text-sm"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
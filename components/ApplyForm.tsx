
import React, { useState } from 'react';
import { Job } from '../types';

interface ApplyFormProps {
  job: Job;
  onClose: () => void;
  onSubmit: () => void;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({ job, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 mx-auto w-full max-w-md z-[70] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full rounded-t-3xl p-6 shadow-2xl animate-slide-up max-w-lg overflow-y-auto no-scrollbar max-h-[90vh]">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Apply Now</h2>
            <p className="text-sm text-gray-500 mt-1">{job.title} • {job.company}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <span className="material-icons-round text-gray-400">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">person</span>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-gray-100 rounded-xl focus:ring-primary focus:border-primary text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">smartphone</span>
              <input
                required
                type="tel"
                placeholder="+971 50 123 4567"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-gray-100 rounded-xl focus:ring-primary focus:border-primary text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Highest Qualification</label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">school</span>
              <select className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border-gray-100 rounded-xl focus:ring-primary focus:border-primary text-gray-900 appearance-none">
                <option>High School</option>
                <option selected>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>PhD</option>
                <option>Diploma</option>
              </select>
              <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload CV</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-icons-outlined text-primary text-2xl">cloud_upload</span>
              </div>
              <p className="text-sm font-semibold text-gray-900"><span className="text-primary">Upload a file</span> or drag and drop</p>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 5MB</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="material-icons-round animate-spin">refresh</span>
            ) : 'Submit Application'}
          </button>
        </form>
        <div className="h-6"></div>
      </div>
    </div>
  );
};

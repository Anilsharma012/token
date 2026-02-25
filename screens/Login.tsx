
import React, { useState } from 'react';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [mobile, setMobile] = useState('');

  return (
    <div className="h-full w-full flex flex-col bg-white p-8 animate-fade-in relative z-10">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mb-6 shadow-premium">
          <span className="material-icons-round text-white text-4xl">local_fire_department</span>
        </div>
        <h1 className="text-3xl font-display font-black text-accent mb-2">Welcome to Token</h1>
        <p className="text-gray-700 font-medium text-center mb-12">Connect with your future career in seconds.</p>

        {step === 'info' ? (
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-700 tracking-widest ml-2">Mobile Number</label>
              <div className="relative">
                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary">smartphone</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-gray-100 rounded-2xl focus:ring-primary focus:border-primary font-bold"
                />
              </div>
            </div>
            <button
              onClick={() => setStep('otp')}
              className="w-full h-16 bg-primary text-white font-display font-bold rounded-2xl shadow-premium shadow-primary/20 active:scale-95 transition-all"
            >
              Get OTP
            </button>
            <div className="flex items-center gap-4 py-4">
              <div className="h-[1px] bg-gray-100 flex-1"></div>
              <span className="text-[10px] font-black text-gray-700 uppercase">OR</span>
              <div className="h-[1px] bg-gray-100 flex-1"></div>
            </div>
            <button className="w-full h-14 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google_color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="text-center">
              <p className="text-sm font-bold text-accent">Verify Code</p>
              <p className="text-xs text-gray-700 mt-1">Sent to +91 {mobile}</p>
            </div>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4].map(i => (
                <input key={i} type="text" maxLength={1} className="w-14 h-16 bg-gray-50 border-gray-100 rounded-2xl text-center font-black text-2xl focus:ring-primary focus:border-primary" />
              ))}
            </div>
            <button
              onClick={onLogin}
              className="w-full h-16 bg-primary text-white font-display font-bold rounded-2xl shadow-premium shadow-primary/20 active:scale-95 transition-all"
            >
              Verify & Enter
            </button>
            <button onClick={() => setStep('info')} className="w-full text-center text-xs font-bold text-primary">Change Number</button>
          </div>
        )}
      </div>
      <p className="text-[10px] text-center text-gray-700 font-bold px-8 leading-relaxed">
        By continuing, you agree to Token's <span className="text-accent underline">Terms of Service</span> and <span className="text-accent underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

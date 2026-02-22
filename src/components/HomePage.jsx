import React, { useState } from "react";
import { Link } from "react-router-dom";

const Homepage = (props) => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 relative overflow-hidden">
      {/* 1. LAYERED BACKGROUND GRADIENTS (The "Glow" behind the glass) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>

      {/* 2. THE CENTRAL SYMMETRICAL HUB */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* LOGO SECTION */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <h2 className="text-white/40 font-bold tracking-[0.3em] text-xs uppercase">
            Attendance Analytics v2
          </h2>
        </div>

        {/* 3. THE GLASS CARD */}

        <div className="w-full bg-white/[0.03] backdrop-blur-[25px] border border-white/10 rounded-[40px] p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Monitor{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Class Performance
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              Generate precise attendance reports for Year 1, 2, and 3.{" "}
              <br className="hidden md:block" />
              Automated tracking for DSA, Web Development, and Mathematics.
            </p>
          </div>

          {/* SYMMETRICAL SELECTION GRID */}
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                Select Academic Year
              </span>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((y) => (
                  <button
                    key={y}
                    onClick={() => props.yearDetail.setYear(y)}
                    className={`relative overflow-hidden group py-4 rounded-2xl border transition-all duration-500 ${
                      props.yearDetail.year === y
                        ? "bg-white/10 border-indigo-500/50 text-white shadow-[0_0_25px_rgba(79,70,229,0.2)]"
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20"
                    }`}
                  >
                    <span className="relative z-10 font-bold text-sm">
                      Year {y}
                    </span>
                    {props.yearDetail.year === y && (
                      <div className="absolute inset-0 bg-indigo-500/10 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* GENERATE BUTTON */}
            <Link
              to="/report"
              className="w-full group relative py-6 bg-white rounded-2xl flex items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              <span className="text-slate-900 font-black text-xl tracking-tight">
                GENERATE WEEKLY REPORT
              </span>
              <svg
                className="w-6 h-6 text-slate-900 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* 4. SYMMETRICAL FOOTER LABELS */}
        <div className="mt-12 flex gap-16">
          <div className="text-center">
            <p className="text-white font-bold text-xl">50+</p>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
              Records / Yr
            </p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-xl">3</p>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
              Subjects
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;

import React from "react";
import { Link } from "react-router-dom";

const Homepage = (props) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#0f172a] clip-path-slant"></div>

      <div className="absolute top-[10%] right-[5%] w-64 h-64 border border-white/5 rounded-full"></div>

      <main className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/*  STATUS BAR */}
        <div className="mb-10 w-full flex justify-between items-center text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] px-4">
          <span>Academic Management System</span>
          <span>Session: 2025/26</span>
        </div>

        {/* 2. THE LEDGER CARD */}
        <div className="w-full bg-white rounded-none border border-slate-200 p-10 md:p-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#10b981]"></div>

          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-none uppercase">
              Student <span className="text-[#10b981]">Attendance</span> <br />
              <span className="font-light text-slate-400">& Performance</span>
            </h1>
            <div className="h-1 w-20 bg-slate-900 mx-auto mb-6"></div>
            <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto leading-relaxed">
              Analyze enrollment data, monitor attendance trends, and manage
              academic cohorts with precision.
            </p>
          </div>

          <div className="w-full max-w-md space-y-12">
            {/* COHORT SELECTION */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Cohort Selection
              </span>
              <div className="flex bg-slate-100 p-1.5 rounded-lg">
                {[1, 2, 3].map((y) => (
                  <button
                    key={y}
                    onClick={() => props.yearDetail.setYear(y)}
                    className={`flex-1 py-3 rounded-md transition-all duration-200 font-bold text-xs ${
                      props.yearDetail.year === y
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    YEAR {y}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <Link
              to="/report"
              className="group w-full py-5 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-4 transition-all"
            >
              <span className="font-bold text-xs uppercase tracking-[0.2em]">
                Access Database
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-12 w-full max-w-2xl grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 overflow-hidden">
          <div className="bg-white p-8 text-center">
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2">
              Total Students
            </p>
            <p className="text-slate-900 font-black text-3xl italic leading-none">
              50
            </p>
          </div>
          <div className="bg-white p-8 text-center">
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2">
              Active Courses
            </p>
            <p className="text-slate-900 font-black text-3xl italic leading-none">
              03
            </p>
          </div>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
        }
      `,
        }}
      />
    </div>
  );
};

export default Homepage;

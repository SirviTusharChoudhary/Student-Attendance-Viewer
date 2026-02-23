import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Report = (props) => {
  const [student, setStudent] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [attendanceOrder, setAttendanceOrder] = useState(0);
  const [attendanceFilter, setAttendanceFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("DSA");

  useEffect(() => {
    setLoading(true);
    const refinedData = originalData.map((ele) => {
      const attendanceValue = 40 + Math.floor(Math.random() * 61);
      return {
        ...ele,
        attendance: attendanceValue,
        currStatus: ["Present", "Absent"][Math.random() > 0.4 ? 0 : 1],
        status: attendanceValue >= 75 ? "Good" : "Low",
      };
    });
    setSubjectData(refinedData);
    setTimeout(() => setLoading(false), 1000);
  }, [subjectFilter, originalData]);

  useEffect(() => {
    let filtered = [...subjectData];
    if (attendanceFilter === "Present")
      filtered = filtered.filter((e) => e.currStatus === "Present");
    if (attendanceFilter === "Absent")
      filtered = filtered.filter((e) => e.currStatus === "Absent");
    if (toggle) filtered = filtered.filter((e) => e.attendance < 75);
    if (attendanceOrder == 1)
      filtered.sort((a, b) => a.attendance - b.attendance);
    if (attendanceOrder == 2)
      filtered.sort((a, b) => b.attendance - a.attendance);
    setStudent(filtered);
  }, [toggle, subjectData, attendanceFilter, attendanceOrder]);

  useEffect(() => {
    async function apiRequest() {
      const skip = (props.year - 1) * 50;
      const apiCall = await fetch(
        `https://dummyjson.com/users?limit=50&skip=${skip}`,
      );
      const data = await apiCall.json();
      const refinedData = data.users.map((ele) => {
        const attendanceValue = 40 + Math.floor(Math.random() * 61);
        return {
          id: ele.id,
          name: `${ele.firstName} ${ele.lastName}`,
          age: 17 + Math.floor(Math.random() * 6),
          email: ele.email,
          phone: ele.phone,
          gender: ele.gender,
          attendance: attendanceValue,
          currStatus: ["Present", "Absent"][Math.random() > 0.4 ? 0 : 1],
          status: attendanceValue >= 75 ? "Good" : "Low",
        };
      });
      setOriginalData(refinedData);
      setSubjectData(refinedData);
      setStudent(refinedData);
      setTimeout(() => setLoading(false), 1500);
    }
    apiRequest();
  }, [props.year]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0c12] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        {/* 2. CORE LOADER UNIT */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 relative">
            <div className="w-20 h-20 border-2 border-emerald-500/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
            </div>
          </div>

          <div className="w-72 h-1 bg-white/5 rounded-none relative overflow-hidden border-x border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-1/2 animate-[dataScan_1.5s_ease-in-out_infinite]"></div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <h3 className="text-white font-black italic tracking-[0.4em] text-xl uppercase">
              Initializing{" "}
              <span className="text-emerald-500">Academic Ledger</span>
            </h3>
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-emerald-500 animate-[bounce_1s_infinite_100ms]"></span>
              <span className="w-1 h-1 bg-emerald-500 animate-[bounce_1s_infinite_200ms]"></span>
              <span className="w-1 h-1 bg-emerald-500 animate-[bounce_1s_infinite_300ms]"></span>
            </div>
          </div>

          <div className="absolute mt-32 text-slate-700 font-mono text-[14px] uppercase tracking-widest">
            Auth_Protocol: Secure // Layer_0{props.year || "X"}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
    @keyframes dataScan {
      0% { transform: translateX(-150%); }
      100% { transform: translateX(250%); }
    }
  `,
          }}
        />
      </div>
    );

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 p-4 relative overflow-hidden font-sans flex flex-col">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-[250px] bg-[#0f172a] clip-path-slant opacity-100 shadow-2xl"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col h-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 mt-2">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="bg-white/10 hover:bg-white/20 p-2 rounded text-white transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
              Academic <span className="text-[#10b981]">Report</span>
              <span className="text-slate-400 ml-3 font-light not-italic text-xl">
                Year {props.year}
              </span>
            </h1>
          </div>

          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 shadow-lg border-b-4 border-slate-900 flex flex-col items-center min-w-[100px]">
              <p className="text-[14px] font-black text-slate-900 uppercase">
                Total
              </p>
              <p className="text-2xl font-black text-slate-900">
                {student.length}
              </p>
            </div>
            <div className="bg-white px-4 py-2 shadow-lg border-b-4 border-orange-500 flex flex-col items-center min-w-[100px]">
              <p className="text-[14px] font-black text-orange-500 uppercase">
                Risk
              </p>
              <p className="text-2xl font-black text-orange-600">
                {student.filter((s) => s.status === "Low").length}
              </p>
            </div>
          </div>
        </div>

        {/*  TOOLBAR */}
        <div className="flex items-center gap-4 mb-4 bg-white/90 backdrop-blur-sm p-3 border border-slate-200 shadow-md rounded-sm">
          <select
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value)}
            className="bg-slate-50 border-l-4 border-[#10b981] text-slate-900 text-[14px] font-black uppercase px-3 py-2 outline-none"
          >
            <option>All Attendance</option>
            <option>Present</option>
            <option>Absent</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="bg-slate-50 border-l-4 border-slate-900 text-slate-900 text-[14px] font-black uppercase px-3 py-2 outline-none"
          >
            <option>DSA</option>
            <option>WEB DEV</option>
            <option>MATHS</option>
          </select>

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          <label className="flex items-center cursor-pointer">
            <input
              onClick={() => setToggle(!toggle)}
              type="checkbox"
              checked={toggle}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-black rounded-full peer peer-checked:bg-orange-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
            <span className="ml-2 text-[14px] font-black uppercase text-slate-500">
              Risk
            </span>
          </label>
        </div>

        {/* THE TABLE */}
        <div className="flex-1 bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col mb-4">
          <div className="overflow-x-auto overflow-y-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-900 text-white">
                <tr>
                  <th className="px-5 py-3 text-[14px] font-black uppercase tracking-widest">
                    Student Identity
                  </th>
                  <th className="px-5 py-3 text-[14px] font-black uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-5 py-3 text-[14px] font-black uppercase tracking-widest">
                    Contact
                  </th>
                  <th
                    className="px-5 py-3 text-[14px] font-black text-[#10b981] uppercase tracking-widest cursor-pointer"
                    onClick={() =>
                      setAttendanceOrder((attendanceOrder + 1) % 3)
                    }
                  >
                    Attendance{" "}
                    {attendanceOrder === 1
                      ? "↑"
                      : attendanceOrder === 2
                        ? "↓"
                        : "↕"}
                  </th>
                  <th className="px-5 py-3 text-[14px] font-black uppercase tracking-widest text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.map((ele) => (
                  <tr
                    key={ele.id}
                    className="hover:bg-slate-50 transition-all group"
                  >
                    <td className="px-5 py-3">
                      <p className="font-bold text-lg text-slate-900 group-hover:text-[#10b981] leading-none uppercase italic tracking-tighter">
                        {ele.name}
                      </p>
                      <p className="text-[12px] text-slate-700 font-bold uppercase mt-1">
                        {ele.gender} | {ele.age}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`px-3 py-1 text-[9px] font-black border ${ele.currStatus === "Present" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}
                      >
                        {ele.currStatus === "Present" ? "PRESENT" : "ABSENT"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-xs font-bold text-slate-800">
                        {ele.email}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-slate-100 overflow-hidden border border-slate-200">
                          <div
                            className={`h-full ${ele.attendance < 75 ? "bg-orange-500" : "bg-[#10b981]"}`}
                            style={{ width: `${ele.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-black italic text-slate-800">
                          {ele.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end">
                        <span
                          className={`px-3 py-1.5 text-[10px] font-black italic tracking-widest rounded-sm border ${
                            ele.status === "Good"
                              ? "bg-emerald-400 text-black border-emerald-200"
                              : "bg-orange-400 text-black border-orange-200"
                          }`}
                        >
                          {ele.status === "Good" ? "OKAY" : "LOW"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
    .clip-path-slant { clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%); }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `,
        }}
      />
    </div>
  );
};

export default Report;

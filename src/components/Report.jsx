import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Report = (props) => {
  const [student, setStudent] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [attendanceFilter, setAttendanceFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("DSA");
  const [attendanceOrder, setAttendanceOrder] = useState(0);

  useEffect(() => {
    setLoading(true);

    const refinedData = originalData.map((ele) => {
      const attendanceValue = 40 + Math.floor(Math.random() * 61);
      return {
        ...ele,
        attendance: attendanceValue,
        currStatus: ["Present", "Absent"][Math.random() > 0.4 ? 0 : 1],
        status: attendanceValue > 75 ? "Good" : "Low", // Changed labels for better UX
      };
    });

    setSubjectData(refinedData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [subjectFilter, originalData]);

  useEffect(() => {
    let filtered = [...subjectData];

    if (attendanceFilter === "Present") {
      filtered = filtered.filter((ele) => ele.currStatus === "Present");
    }

    if (attendanceFilter === "Absent") {
      filtered = filtered.filter((ele) => ele.currStatus === "Absent");
    }

    if (toggle) {
      filtered = filtered.filter((ele) => ele.attendance < 75);
    }

    if (attendanceOrder == 1) {
      filtered = filtered.sort((a, b) => a.attendance - b.attendance);
    }

    if (attendanceOrder == 2) {
      filtered = filtered.sort((a, b) => b.attendance - a.attendance);
    }

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
          age: ele.age,
          email: ele.email,
          gender: ele.gender,
          bloodGroup: ele.bloodGroup,
          phone: ele.phone,
          attendance: attendanceValue,
          currStatus: ["Present", "Absent"][Math.random() > 0.4 ? 0 : 1],
          status: attendanceValue > 80 ? "Good" : "Low", // Changed labels for better UX
        };
      });

      setOriginalData(refinedData);
      setTimeout(() => {
        setSubjectData(refinedData);
        setStudent(refinedData);
        setLoading(false);
      }, 1000);
    }
    apiRequest();
  }, [props.year]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="text-indigo-400 font-bold animate-pulse tracking-widest text-xl">
          PARSING BATCH DATA...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 p-4 md:p-10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8">
          <div className="flex-1">
            <Link
              to="/"
              className="text-indigo-400 text-xs font-bold uppercase tracking-widest hover:text-indigo-300 transition-colors"
            >
              ← Back to Terminal
            </Link>
            <h1 className="text-4xl font-black text-white mt-2">
              Batch Report{" "}
              <span className="text-indigo-500">Year {props.year}</span>
            </h1>

            {/* Filter UI Controls */}
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Attendance Filter
                </label>
                <select
                  value={attendanceFilter}
                  onChange={(e) => setAttendanceFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2 outline-none focus:border-indigo-500/50 transition-all cursor-pointer appearance-none min-w-[140px]"
                >
                  <option className="bg-[#1a1a1c]">All</option>
                  <option className="bg-[#1a1a1c]">Present</option>
                  <option className="bg-[#1a1a1c]">Absent</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Subject Filter
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2 outline-none focus:border-indigo-500/50 transition-all cursor-pointer appearance-none min-w-[140px]"
                >
                  <option className="bg-[#1a1a1c]">DSA</option>
                  <option className="bg-[#1a1a1c]">WEB DEV</option>
                  <option className="bg-[#1a1a1c]">MATHS</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Risk Analysis
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    onClick={() => setToggle(!toggle)}
                    type="checkbox"
                    checked={toggle}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  <span className="ms-3 text-sm font-medium text-slate-400">
                    Attendance &lt; 75%
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Total Students
              </p>
              <p className="text-xl font-black text-white">{student.length}</p>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Low
              </p>
              <p className="text-xl font-black text-red-400">
                {student.filter((s) => s.status === "Low").length}
              </p>
            </div>
          </div>
        </div>

        {/* The Glass Table */}
        <div className="bg-white/[0.02] backdrop-blur-[20px] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Student
                  </th>
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Today
                  </th>
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Contact
                  </th>
                  <th
                    className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-400 transition-colors"
                    onClick={() =>
                      setAttendanceOrder((attendanceOrder + 1) % 3)
                    }
                  >
                    <div className="flex items-center gap-2">
                      Attendance
                      <span className="text-indigo-500 text-lg">
                        {attendanceOrder === 0 && "↕"}
                        {attendanceOrder === 1 && "↑"}
                        {attendanceOrder === 2 && "↓"}
                      </span>
                    </div>
                  </th>
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                    Metric
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {student.map((ele) => (
                  <tr
                    key={ele.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="p-6">
                      <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {ele.name}
                      </p>
                      <p className="text-xs text-slate-500 uppercase">
                        {ele.gender} • Age {ele.age}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full animate-pulse ${ele.currStatus === "Present" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"}`}
                        ></div>
                        <span
                          className={`text-xs font-bold ${ele.currStatus === "Present" ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {ele.currStatus}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-slate-300">{ele.email}</p>
                      <p className="text-xs text-slate-500">{ele.phone}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${ele.attendance < 75 ? "bg-red-500" : "bg-emerald-500"}`}
                            style={{ width: `${ele.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-mono font-bold">
                          {ele.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          ele.status === "Good"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}
                      >
                        {ele.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

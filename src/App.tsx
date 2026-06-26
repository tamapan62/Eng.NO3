import React from "react";

// Component สำหรับ Icon แบบ Inline SVG
const TargetIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const BarChart2Icon = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const PlusCircleIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const StarIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function App() {
  return (
    // ถอดระบบซ่อนจอ (opacity) ออก เพราะเราจะให้ Tailwind โหลดเสร็จตั้งแต่ index.html แล้ว
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-[#f7f9fc]"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* ส่วนหัว (Header) */}
        <header className="text-center mt-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d3748] mb-4 tracking-tight drop-shadow-sm">
            ระบบบริหารงานวิศวกรรม
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#3b82f6] bg-blue-50 py-2 px-6 rounded-full inline-block">
            หน่วยงานปฏิบัติการโครงการพิเศษลูกค้า 7-11
          </h2>
        </header>

        {/* ส่วนของแอปพลิเคชัน (3 กล่องเรียงกัน) */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* แอปที่ 1 (ซ้ายสุด - สีน้ำเงิน) */}
          <a
            href="https://eng-no-1.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="block bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-[2rem] p-8 text-center shadow-lg group relative overflow-hidden text-decoration-none flex flex-col justify-center min-h-[260px] border border-blue-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="w-[5rem] h-[5rem] mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <TargetIcon size={44} strokeWidth={2} />
            </div>
            <h3 className="text-white text-xl font-bold mb-3 leading-snug tracking-wide">
              TOP E1A MAINTENANCE
              <br />
              LEAGUE
            </h3>
            <p className="text-blue-100/90 text-sm leading-relaxed px-2 font-medium">
              สาขา TOP CALL
            </p>
          </a>

          {/* แอปที่ 2 (ตรงกลาง - สีส้ม) */}
          <a
            href="https://e1-a.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="block bg-gradient-to-br from-[#fb923c] to-[#ea580c] rounded-[2rem] p-8 text-center shadow-lg group relative overflow-hidden text-decoration-none flex flex-col justify-center min-h-[260px] border border-orange-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="w-[5rem] h-[5rem] mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <BarChart2Icon size={44} strokeWidth={2} />
            </div>
            <h3 className="text-white text-xl font-bold mb-3 leading-snug tracking-wide">
              ระบบรายงาน Call
              <br />
              MAINTENANCE DASHBOARD
            </h3>
            <p className="text-orange-100/90 text-sm leading-relaxed px-2 font-medium">
              DASHBOARD CALL
            </p>
          </a>

          {/* แอปที่ 3 (ขวาสุด - สีเขียว) */}
          <a
            href="https://monitor-asset.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="block bg-gradient-to-br from-[#10b981] to-[#059669] rounded-[2rem] p-8 text-center shadow-lg group relative overflow-hidden text-decoration-none flex flex-col justify-center min-h-[260px] border border-emerald-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20"
          >
            <div className="w-[5rem] h-[5rem] mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <PlusCircleIcon size={44} strokeWidth={2} />
            </div>
            <h3 className="text-white text-xl font-bold mb-3 leading-snug tracking-wide">
              ระบบตรวจสอบอายุ
              <br />
              (Monitor Asset)
            </h3>
            <p className="text-emerald-100/90 text-sm leading-relaxed px-2 font-medium">
              คำอธิบายระบบเพิ่มเติม
            </p>
          </a>
        </main>

        {/* ส่วนล่าง (Footer Banner) */}
        <div className="mt-12 mb-6 max-w-4xl mx-auto">
          <div className="bg-white border border-red-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-900/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex shrink-0 items-center justify-center shadow-lg shadow-red-500/30 rotate-3">
                <StarIcon size={32} />
              </div>
              <div>
                <h4 className="text-[#991b1b] font-bold text-xl mb-1">
                  ประเมินความพึงพอใจการใช้งาน
                </h4>
                <p className="text-red-600/80 text-sm font-medium">
                  ความคิดเห็นของคุณช่วยเราพัฒนาระบบให้ดียิ่งขึ้น (ใช้เวลาเพียง 1
                  นาที)
                </p>
              </div>
            </div>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 relative z-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              ให้คะแนนระบบ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

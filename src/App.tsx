import React from "react";

// โหลด Tailwind, Font และ Icon ทันทีที่ไฟล์นี้ถูกเรียกใช้งาน (เพื่อให้ทำงานบน Vercel ได้)
if (typeof window !== "undefined") {
  if (!document.getElementById("tailwind-cdn")) {
    const tailwindScript = document.createElement("script");
    tailwindScript.id = "tailwind-cdn";
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);
  }

  if (!document.getElementById("phosphor-icons")) {
    const phosphorScript = document.createElement("script");
    phosphorScript.id = "phosphor-icons";
    phosphorScript.src = "https://unpkg.com/@phosphor-icons/web";
    document.head.appendChild(phosphorScript);
  }

  if (!document.getElementById("prompt-font")) {
    const fontLink = document.createElement("link");
    fontLink.id = "prompt-font";
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(fontLink);
  }
}

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'Prompt', sans-serif", backgroundColor: "#f7f9fc" }}
    >
      {/* ใส่ Style สำหรับ Hover Effect */}
      <style>{`
        .app-card {
          transition: all 0.3s ease;
        }
        .app-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* ส่วนหัว (Header) */}
        <header className="text-center mt-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d3748] mb-4 tracking-tight">
            ระบบบริหารงานวิศวกรรม
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#3b82f6]">
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
            className="app-card block bg-[#2a52be] rounded-[2rem] p-8 text-center shadow-lg group relative overflow-hidden text-decoration-none flex flex-col justify-center min-h-[250px]"
          >
            <div className="w-[4.5rem] h-[4.5rem] mx-auto bg-white/20 rounded-2xl flex items-center justify-center text-white mb-5 shrink-0">
              <i className="ph ph-target text-[2.5rem]"></i>
            </div>
            <h3 className="text-white text-xl font-bold mb-3 leading-snug">
              TOP E1A MAINTENANCE
              <br />
              LEAGUE
            </h3>
            <p className="text-white/85 text-sm leading-relaxed px-2">
              สาขา TOP CALL
            </p>
          </a>

          {/* แอปที่ 2 (ตรงกลาง - สีส้ม) */}
          <a
            href="https://e1-a.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="app-card block bg-[#f27420] rounded-[2rem] p-8 text-center shadow-lg group relative overflow-hidden text-decoration-none flex flex-col justify-center min-h-[250px]"
          >
            <div className="w-[4.5rem] h-[4.5rem] mx-auto bg-white/20 rounded-2xl flex items-center justify-center text-white mb-5 shrink-0">
              <i className="ph ph-chart-bar text-[2.5rem]"></i>
            </div>
            <h3 className="text-white text-xl font-bold mb-3 leading-snug">
              ระบบรายงาน Call
              <br />
              MAINTENANCE DASHBOARD
            </h3>
            <p className="text-white/85 text-sm leading-relaxed px-2">
              DASHBOARD CALL
            </p>
          </a>

          {/* แอปที่ 3 (ขวาสุด - สีเขียว) */}
          <a
            href="https://monitor-asset.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="app-card block bg-[#1c9c64] rounded-[2rem] p-8 text-center shadow-lg group relative overflow-hidden text-decoration-none flex flex-col justify-center min-h-[250px]"
          >
            <div className="w-[4.5rem] h-[4.5rem] mx-auto bg-white/20 rounded-2xl flex items-center justify-center text-white mb-5 shrink-0">
              <i className="ph ph-plus-circle text-[2.5rem]"></i>
            </div>
            <h3 className="text-white text-xl font-bold mb-3 leading-snug">
              ระบบตรวจสอบอายุ
              <br />
              (Monitor Asset)
            </h3>
            <p className="text-white/85 text-sm leading-relaxed px-2">
              คำอธิบายระบบเพิ่มเติม
            </p>
          </a>
        </main>

        {/* ส่วนล่าง (Footer Banner) */}
        <div className="mt-8 mb-4 max-w-4xl mx-auto">
          <div className="bg-[#fef2f2] border border-[#fecdd3] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-[#ef4444] text-white flex shrink-0 items-center justify-center shadow-md">
                <i className="ph-fill ph-star text-3xl"></i>
              </div>
              <div>
                <h4 className="text-[#b91c1c] font-bold text-lg mb-1">
                  ประเมินความพึงพอใจการใช้งาน
                </h4>
                <p className="text-[#ef4444] text-sm">
                  ความคิดเห็นของคุณช่วยเราพัฒนาระบบให้ดียิ่งขึ้น (ใช้เวลาเพียง 1
                  นาที)
                </p>
              </div>
            </div>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md"
            >
              ให้คะแนนระบบ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

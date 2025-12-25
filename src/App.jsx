import React, { useState } from 'react';

// Import Component ของคุณ
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQ from './components/FAQ';
import SpaceBackground from './components/SpaceBackground';

// Import เกมที่เราเพิ่งสร้าง
import GachaGame from './components/GachaGame';

function App() {
    // ใช้ State เพื่อจัดการการสลับหน้า แทน Router
    const [currentPage, setCurrentPage] = useState('home'); // 'home' หรือ 'play'

    return (
        <div className="min-h-screen text-white font-sans overflow-x-hidden relative flex flex-col">
            {/* พื้นหลังอวกาศจะแสดงผลอยู่ข้างหลังสุด และคงอยู่ตลอดทุกหน้า */}
            <SpaceBackground />

            <div className="relative z-10 flex-1 flex flex-col">
                <Navbar />

                <main className="container mx-auto px-4 flex-1 flex flex-col">
                    {/* --- เงื่อนไขแสดงหน้าแรก (Home Page) --- */}
                    {currentPage === 'home' && (
                        <div className="animate-in fade-in duration-500 py-10">
                            <Hero />

                            {/* ปุ่มกดเข้าเกม (เปลี่ยน State เป็น 'play') */}
                            <div className="flex justify-center my-16">
                                <button
                                    onClick={() => setCurrentPage('play')}
                                    className="group relative px-10 py-5 bg-transparent overflow-hidden rounded-full border border-blue-500/50 hover:border-blue-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                                >
                                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                                    <span className="relative font-bold text-2xl tracking-widest flex items-center gap-3">
                                        🚀 ENTER GAME WORLD
                                    </span>
                                </button>
                            </div>

                            <Features />
                            <FAQ />
                        </div>
                    )}

                    {/* --- เงื่อนไขแสดงหน้าเล่นเกม (Game Page) --- */}
                    {currentPage === 'play' && (
                        <section id="gacha-section" className="flex-1 flex flex-col items-center justify-center pt-4 pb-20 animate-in fade-in zoom-in-95 duration-500 relative">

                            {/* ส่วนหัวข้อถูกลบออกไปแล้วตามที่ขอ */}

                            {/* ส่งฟังก์ชันปิดเกมไปให้ GachaGame จัดการเอง */}
                            <div className="w-full max-w-[1400px] mt-4">
                                <GachaGame onClose={() => setCurrentPage('home')} />
                            </div>

                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
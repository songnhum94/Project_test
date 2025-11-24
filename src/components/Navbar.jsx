import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-[1000px] px-8 py-3 flex justify-between items-center z-50 rounded-full bg-[rgba(15,12,41,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <a href="#" className="flex items-center gap-2 text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent cursor-pointer no-underline">
                <img src="/logo.png" alt="Flashmoon Logo" className="h-10 w-auto object-contain" />
                FLASHMOON
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
                {['Chart', 'Coin', 'Gacha', 'Whitepaper'].map((item) => (
                    <a
                        key={item}
                        href={item === 'Whitepaper' ? 'https://songnhum94.github.io/White-paper/' : '#'}
                        target={item === 'Whitepaper' ? '_blank' : '_self'}
                        rel={item === 'Whitepaper' ? 'noopener noreferrer' : ''}
                        className="relative font-medium text-[0.95rem] text-[rgba(255,255,255,0.8)] no-underline transition-colors duration-300 hover:text-[var(--color-neon-blue)] hover:drop-shadow-[0_0_10px_rgba(0,242,255,0.5)] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-5px] after:left-0 after:bg-[var(--color-neon-blue)] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden text-2xl cursor-pointer text-white" onClick={toggleMenu}>
                {isOpen ? <X /> : <Menu />}
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-[85px] left-1/2 -translate-x-1/2 w-[95%] p-8 gap-5 flex flex-col bg-[rgba(15,12,41,0.95)] backdrop-blur-xl border border-[rgba(255,255,255,0.15)] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[999]">
                    {['Chart', 'Coin', 'Gacha', 'Whitepaper'].map((item) => (
                        <a
                            key={item}
                            href={item === 'Whitepaper' ? 'https://songnhum94.github.io/White-paper/' : '#'}
                            className="text-[1.1rem] p-3 border-b border-[rgba(255,255,255,0.05)] w-full text-center text-white transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:rounded-xl hover:border-transparent hover:translate-x-1 last:border-b-0"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

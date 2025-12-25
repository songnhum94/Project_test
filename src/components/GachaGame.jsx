import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, MeshDistortMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Wallet, Coins, RefreshCw, Trophy, X, Zap, Flame, Star, Backpack, Grid, ShieldAlert, Info, RotateCcw, Filter } from 'lucide-react';

import { RARITY_CONFIG, STANDARD_ITEMS, DRAGON_ITEMS } from '../data/items';

// --- CONFIGURATION ---
const COST_PER_ROLL = 100;

// --- 3D SCENE ---
import Scene3D from './Scene3D';

// --- MAIN COMPONENT ---
export default function GachaGame({ onClose }) {
    const [walletAddress, setWalletAddress] = useState(null);
    const [balance, setBalance] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [lastItem, setLastItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentBanner, setCurrentBanner] = useState('standard');
    const [showInventory, setShowInventory] = useState(false);
    const [showPoolInfo, setShowPoolInfo] = useState(false);
    const [inventoryFilter, setInventoryFilter] = useState('all');
    const [flash, setFlash] = useState(false); // Visual flash effect

    // --- LOCAL STORAGE ---
    useEffect(() => {
        const savedInventory = localStorage.getItem('gacha_inventory');
        const savedBalance = localStorage.getItem('gacha_balance');

        if (savedInventory) setInventory(JSON.parse(savedInventory));
        if (savedBalance) setBalance(parseInt(savedBalance));
    }, []);

    useEffect(() => {
        localStorage.setItem('gacha_inventory', JSON.stringify(inventory));
        if (walletAddress) localStorage.setItem('gacha_balance', balance.toString());
    }, [inventory, balance, walletAddress]);

    // --- SOUND SYSTEM ---
    // --- SOUND SYSTEM ---
    const playSynthSound = (type) => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const now = ctx.currentTime;

            if (type === 'roll') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === 'win') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.1);
                osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else { // open/close/click
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            }
        } catch (e) {
            console.error("Synth failed:", e);
        }
    };

    const playSound = (type, rarity = 'COMMON') => {
        let audioSrc = '';

        switch (type) {
            case 'roll': audioSrc = '/sounds/gacha_roll.mp3'; break;
            case 'open': audioSrc = '/sounds/ui_open.mp3'; break;
            case 'close': audioSrc = '/sounds/ui_close.mp3'; break;
            case 'win':
                if (rarity === 'LEGENDARY') audioSrc = '/sounds/sfx_legendary.mp3';
                else if (rarity === 'EPIC') audioSrc = '/sounds/sfx_epic.mp3';
                else if (rarity === 'RARE') audioSrc = '/sounds/sfx_rare.mp3';
                else audioSrc = '/sounds/sfx_common.mp3';
                break;
            default: break;
        }

        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.volume = 0.5;
            audio.play().catch(() => {
                // Fallback if file missing
                playSynthSound(type);
            });
        } else {
            playSynthSound(type);
        }
    };

    const toggleInventory = () => {
        playSound(showInventory ? 'close' : 'open');
        setShowInventory(!showInventory);
    };

    const togglePoolInfo = () => {
        playSound(showPoolInfo ? 'close' : 'open');
        setShowPoolInfo(!showPoolInfo);
    };

    const connectWallet = () => {
        setWalletAddress("0x71C...9A23");
        setBalance(10000);
        playSound('open');
    };

    // ปุ่มเติมเงิน (Refill)
    const refillBalance = () => {
        setBalance(prev => prev + 10000);
        playSound('open');
    };

    // --- LOGIC ---
    const calculateResult = (targetDB) => {
        let selectedRarity = "COMMON";

        const rand = Math.random();
        if (rand <= RARITY_CONFIG.LEGENDARY.rate) selectedRarity = "LEGENDARY";
        else if (rand <= RARITY_CONFIG.LEGENDARY.rate + RARITY_CONFIG.EPIC.rate) selectedRarity = "EPIC";
        else if (rand <= RARITY_CONFIG.LEGENDARY.rate + RARITY_CONFIG.EPIC.rate + RARITY_CONFIG.RARE.rate) selectedRarity = "RARE";
        else if (rand <= RARITY_CONFIG.LEGENDARY.rate + RARITY_CONFIG.EPIC.rate + RARITY_CONFIG.RARE.rate + RARITY_CONFIG.UNCOMMON.rate) selectedRarity = "UNCOMMON";
        else selectedRarity = "COMMON";

        const pool = targetDB.filter(item => item.rarity === selectedRarity);
        const selectedItem = pool.length > 0
            ? pool[Math.floor(Math.random() * pool.length)]
            : targetDB.find(item => item.rarity === "COMMON") || { id: 999, name: "Error Item", rarity: "COMMON" };

        return selectedItem;
    };

    // --- ROLL x1 ---
    const handleRoll = () => {
        if (!walletAddress) return alert("Please connect wallet!");
        if (balance < COST_PER_ROLL) return alert("Not enough G-COIN!");

        setBalance((prev) => prev - COST_PER_ROLL);
        setIsRolling(true);
        setLastItem(null);
        playSound('roll');

        const targetDB = currentBanner === 'dragon' ? DRAGON_ITEMS : STANDARD_ITEMS;

        // Flash Effect
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        setTimeout(() => {
            const resultItem = calculateResult(targetDB);

            setInventory((prev) => [resultItem, ...prev]);
            setLastItem(resultItem);
            setIsRolling(false);
            setShowModal(true);
            playSound('win', resultItem.rarity);
        }, 3000);
    };

    // ดึงรายการไอเท็มตามตู้ปัจจุบันเพื่อแสดงใน Pool Info
    const currentPoolItems = currentBanner === 'dragon' ? DRAGON_ITEMS : STANDARD_ITEMS;

    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState(0);

    // --- LEADERBOARD LOGIC ---
    useEffect(() => {
        // Generate initial mock data
        const initialData = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            address: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
            score: Math.floor(Math.random() * 50000) + 10000
        })).sort((a, b) => b.score - a.score);
        setLeaderboardData(initialData);

        // Simulate Real-time updates
        const interval = setInterval(() => {
            setLeaderboardData(prev => {
                const newData = prev.map(item => ({
                    ...item,
                    score: item.score + Math.floor(Math.random() * 500) - 200 // Random fluctuation
                })).sort((a, b) => b.score - a.score);
                return newData;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Update User Rank based on balance
    useEffect(() => {
        if (!walletAddress) return;
        // User's temporary score is their balance for this mock
        const currentScore = balance;
        const allScores = [...leaderboardData.map(d => d.score), currentScore].sort((a, b) => b - a);
        const rank = allScores.indexOf(currentScore) + 1;
        setUserRank(rank);
    }, [balance, leaderboardData, walletAddress]);

    const toggleLeaderboard = () => {
        playSound(showLeaderboard ? 'close' : 'open');
        setShowLeaderboard(!showLeaderboard);
    };

    return (
        <div className="relative flex flex-col-reverse md:flex-row bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-6xl mx-auto my-12 min-h-[600px]">

            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-red-500/80 text-white transition-all backdrop-blur-sm shadow-lg border border-white/10 group"
                    title="Close Game"
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            )}

            {/* Flash Effect on Summon */}
            <div className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-200 ${flash ? 'opacity-80' : 'opacity-0'}`}></div>

            <div className="w-full md:w-1/2 p-6 md:p-8 z-10 flex flex-col justify-between border-white/5 relative">
                <div className="text-center">
                    <div className="inline-block relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-40 animate-pulse"></div>
                        <h2 className="relative text-4xl md:text-5xl font-black italic text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] mb-2 tracking-tighter">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">NEO-GACHA</span>
                        </h2>
                    </div>
                    <p className="text-cyan-200/80 text-xs md:text-sm mb-6 font-mono tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                        Blockchain Random Generator
                    </p>

                    <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 items-center">
                        <button onClick={() => setCurrentBanner('standard')} className={`flex-1 py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm md:text-base border ${currentBanner === 'standard' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-800/50 border-transparent text-slate-500 hover:bg-slate-800'}`}><Star size={16} className="md:w-[18px] md:h-[18px]" /> Standard</button>
                        <button onClick={() => setCurrentBanner('dragon')} className={`flex-1 py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm md:text-base border ${currentBanner === 'dragon' ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-slate-800/50 border-transparent text-slate-500 hover:bg-slate-800'}`}><Flame size={16} className="md:w-[18px] md:h-[18px]" /> Dragon</button>
                        {/* ปุ่ม INFO */}
                        <button onClick={togglePoolInfo} className="p-2 md:p-3 rounded-xl bg-slate-800/50 hover:bg-blue-600/20 border border-white/10 hover:border-blue-400 transition-colors text-slate-400 hover:text-blue-300" title="View Drop Rates & Items">
                            <Info size={18} />
                        </button>
                        {/* ปุ่ม LEADERBOARD */}
                        <button onClick={toggleLeaderboard} className="p-2 md:p-3 rounded-xl bg-slate-800/50 hover:bg-yellow-600/20 border border-white/10 hover:border-yellow-400 transition-colors text-slate-400 hover:text-yellow-300" title="Leaderboard">
                            <Trophy size={18} />
                        </button>
                    </div>

                    {!walletAddress ? (
                        <button onClick={connectWallet} className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl flex items-center justify-center gap-3 font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] text-sm md:text-base">
                            <Wallet size={20} /> CONNECT WALLET
                        </button>
                    ) : (
                        <div className="bg-black/30 rounded-xl p-3 md:p-4 border border-white/5 space-y-3">
                            <div className="flex justify-between font-mono text-xs md:text-sm text-slate-400">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Connected</span>
                                <span className="text-emerald-400 font-bold">{walletAddress}</span>
                            </div>
                            <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-2 text-yellow-500 font-bold text-sm md:text-base"><Coins size={18} /> {balance.toLocaleString()}</span>
                                    {/* Link for Swap */}
                                    <a
                                        href="https://pancakeswap.finance/swap?chain=bsc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 px-2 py-1 rounded border border-blue-500/30 flex items-center gap-1 transition-colors"
                                    >
                                        Swap <RotateCcw size={10} className="rotate-90" />
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold">Your Rank</span>
                                        <span className="text-sm font-bold text-white">#{userRank > 0 ? userRank : '-'}</span>
                                    </div>
                                    <button onClick={refillBalance} className="p-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg transition-colors" title="Refill 10,000 Credits">
                                        <RotateCcw size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="my-4 md:my-6 space-y-3">
                    <button onClick={handleRoll} disabled={isRolling || !walletAddress || balance < COST_PER_ROLL} className={`w-full py-3 md:py-4 rounded-xl text-lg font-black tracking-widest shadow-xl transition-all border border-t-white/10 ${isRolling ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : currentBanner === 'dragon' ? 'bg-gradient-to-r from-red-900 to-orange-900 hover:from-red-800 text-white border-red-500/30' : 'bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 text-white border-indigo-500/30'}`}>
                        {isRolling ? <span className="flex items-center justify-center gap-3 animate-pulse"><RefreshCw className="animate-spin" /> ...</span> : <div className="flex justify-center items-center gap-4"><span className="flex items-center gap-2"><Zap className="fill-current" /> SUMMON x1</span><span className="text-xs font-normal opacity-70 bg-black/30 px-2 py-1 rounded">{COST_PER_ROLL} G</span></div>}
                    </button>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={toggleInventory}
                        className="w-full py-4 px-5 bg-slate-800/40 hover:bg-slate-700/60 border border-white/10 rounded-2xl flex items-center justify-between group transition-all shadow-lg hover:shadow-blue-500/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300 rounded-xl group-hover:scale-110 transition-transform border border-white/5">
                                <Backpack size={24} />
                            </div>
                            <div className="text-left">
                                <div className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">My Storage</div>
                                {/* คำนวณจำนวนไอเท็มแบบ Unique (ไม่นับซ้ำ) หรือจะนับรวมก็ได้ */}
                                <div className="text-xs text-slate-500 font-mono">{new Set(inventory.map(i => i.id)).size} Unique Items</div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                            <Grid size={16} className="text-slate-400" />
                        </div>
                    </button>
                </div>
            </div>

            {/* --- LEADERBOARD DRAWER --- */}
            {showLeaderboard && (
                <div className="absolute inset-0 z-[70] bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom duration-300 border-r border-white/10">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                                <Trophy className="text-yellow-400" /> Leaderboard
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Live Updates</p>
                        </div>
                        <button
                            onClick={toggleLeaderboard}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full transition-colors cursor-pointer border border-red-500/30"
                        >
                            <X size={18} />
                            <span className="text-xs font-bold uppercase">Close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
                        {/* Header */}
                        <div className="grid grid-cols-12 text-xs font-bold text-slate-500 uppercase px-4 pb-2">
                            <div className="col-span-2">Rank</div>
                            <div className="col-span-6">User</div>
                            <div className="col-span-4 text-right">Score</div>
                        </div>

                        {/* Rows */}
                        {leaderboardData.map((user, index) => (
                            <div key={user.id} className={`grid grid-cols-12 items-center p-3 rounded-xl border ${userRank === index + 1 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-black/30 border-white/5'} transition-all hover:bg-white/5`}>
                                <div className="col-span-2 font-black text-lg text-slate-300 italic">#{index + 1}</div>
                                <div className="col-span-6 font-mono text-sm text-slate-400 truncate">{user.address}</div>
                                <div className="col-span-4 text-right font-bold text-white text-sm">{user.score.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- POOL INFO DRAWER (แสดงรายการของในตู้) --- */}
            {showPoolInfo && (
                <div className="absolute inset-0 z-[70] bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom duration-300 border-r border-white/10">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                                <Info className="text-blue-400" /> Drop Rates & Items
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Viewing pool: <span className="text-blue-300 font-bold uppercase">{currentBanner}</span></p>
                        </div>
                        <button
                            onClick={togglePoolInfo}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full transition-colors cursor-pointer border border-red-500/30"
                        >
                            <X size={18} />
                            <span className="text-xs font-bold uppercase">Close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {/* แสดง Rate Info */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6 text-center">
                            {Object.entries(RARITY_CONFIG).map(([key, config]) => (
                                <div key={key} className={`text-[10px] p-2 rounded border bg-black/40 ${config.border.replace('border-', 'border-').replace('400', '500/30')} ${config.color}`}>
                                    <div className="font-bold">{key}</div>
                                    <div>{(config.rate * 100).toFixed(0)}%</div>
                                </div>
                            ))}
                        </div>

                        {/* แสดง Items Grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 content-start pb-20">
                            {currentPoolItems.map((item) => (
                                <div key={item.id} className={`relative group aspect-square rounded-xl border ${item.border.replace('text-', 'border-').replace('400', '500/30')} bg-black/40 hover:bg-white/5 transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer overflow-hidden`}>
                                    {/* Item Image */}
                                    <img src={item.image} alt={item.name} className="w-full h-2/3 object-cover rounded-md mb-1 opacity-80 group-hover:opacity-100 transition-opacity" />

                                    <div className={`text-[10px] font-bold ${item.color} truncate w-full px-1`}>{item.name}</div>
                                    <div className="text-[9px] text-slate-500 uppercase">{item.rarity}</div>

                                    {/* Hover Detail */}
                                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center p-2 z-10">
                                        <span className={`text-xs font-bold ${item.color} mb-1`}>{item.name}</span>
                                        <p className="text-[9px] text-slate-300 line-clamp-3 mb-2">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- INVENTORY DRAWER --- */}
            {showInventory && (
                <div className="absolute inset-0 z-[70] bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom duration-300 border-r border-white/10">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                                <Backpack className="text-blue-400" /> Storage
                            </h3>
                            <button
                                onClick={toggleInventory}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full transition-colors cursor-pointer border border-red-500/30"
                            >
                                <X size={18} />
                                <span className="text-xs font-bold uppercase">Close</span>
                            </button>
                        </div>

                        {/* --- Filter Buttons --- */}
                        <div className="flex gap-2 p-1 bg-black/30 rounded-lg">
                            {['all', 'standard', 'dragon'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setInventoryFilter(filter)}
                                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${inventoryFilter === filter
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {inventory.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                                <Backpack size={48} className="opacity-20" />
                                <p>Your bag is empty. Summon some items!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 content-start pb-20">
                                {/* Logic Group Item & Filter */}
                                {(() => {
                                    // 1. กรองตาม Filter (All / Standard / Dragon)
                                    const filteredInventory = inventory.filter(item => {
                                        if (inventoryFilter === 'all') return true;
                                        return item.source === inventoryFilter;
                                    });

                                    // 2. จัดกลุ่มไอเท็มซ้ำ
                                    const uniqueInventory = [];
                                    const itemMap = new Map();

                                    filteredInventory.forEach(item => {
                                        if (itemMap.has(item.id)) {
                                            itemMap.get(item.id).count++;
                                        } else {
                                            const newItem = { ...item, count: 1 };
                                            itemMap.set(item.id, newItem);
                                            uniqueInventory.push(newItem);
                                        }
                                    });

                                    if (uniqueInventory.length === 0) {
                                        return (
                                            <div className="col-span-full text-center text-slate-500 py-10">
                                                No items found in this category.
                                            </div>
                                        );
                                    }

                                    return uniqueInventory.map((item, idx) => (
                                        <div key={idx} className={`relative group aspect-square rounded-xl border ${item.border.replace('text-', 'border-').replace('400', '500/30')} bg-black/40 hover:bg-white/5 transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer overflow-hidden`}>
                                            <img src={item.image} alt={item.name} className="w-full h-2/3 object-cover rounded-md mb-1 opacity-80 group-hover:opacity-100 transition-opacity" />

                                            <div className={`text-[10px] font-bold ${item.color} truncate w-full px-1`}>{item.name}</div>
                                            <div className="text-[9px] text-slate-500 uppercase">{item.rarity}</div>

                                            {/* Badge แสดงจำนวนไอเท็มซ้ำ */}
                                            {item.count > 1 && (
                                                <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md z-20 border border-white/20">
                                                    x{item.count}
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center p-2 z-10">
                                                <span className={`text-xs font-bold ${item.color} mb-1`}>{item.name}</span>
                                                <p className="text-[9px] text-slate-300 line-clamp-3 mb-2">{item.description}</p>
                                                <span className="text-[8px] text-slate-500 font-mono">Owned: {item.count}</span>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Scene3D isRolling={isRolling} theme={currentBanner} />

            {/* REWARD MODAL */}
            {showModal && lastItem && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className={`bg-slate-900/80 border p-1 rounded-3xl max-w-4xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-100 animate-in zoom-in-95 duration-300 border-white/20`}>
                        <div className="bg-gradient-to-b from-slate-800 to-black rounded-[20px] p-8 text-center relative overflow-hidden max-h-[80vh] overflow-y-auto">

                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"><X size={24} /></button>

                            {/* กรณี x1: แสดงชิ้นเดียวใหญ่ๆ */}
                            <div>
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 ${lastItem.bg} blur-3xl opacity-40`}></div>
                                <div className="mb-6 mt-4 relative">
                                    <div className={`w-40 h-40 mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800 ${lastItem.bg} ${lastItem.color} ring-4 ring-white/10`}>
                                        <img src={lastItem.image} alt={lastItem.name} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <h2 className={`text-3xl font-black mb-2 ${lastItem.color} uppercase tracking-widest drop-shadow-lg`}>{lastItem.name}</h2>
                                <div className={`inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 ${lastItem.color} text-xs font-bold uppercase tracking-widest mb-4`}>{lastItem.rarity}</div>
                                <p className="text-slate-400 text-sm italic max-w-sm mx-auto">"{lastItem.description}"</p>
                            </div>

                            <button onClick={() => setShowModal(false)} className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-colors tracking-wider mt-8">
                                COLLECT ALL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
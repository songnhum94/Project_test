import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQ from './components/FAQ';
import SpaceBackground from './components/SpaceBackground';

function App() {
    return (
        <div className="min-h-screen text-white font-sans overflow-x-hidden">
            <SpaceBackground />
            <Navbar />

            <main className="container mx-auto">
                <Hero />
                <Features />
                <FAQ />
            </main>
        </div>
    );
}

export default App;

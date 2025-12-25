import React from 'react';

const Hero = () => {
    return (
        <section className="min-h-[80vh] flex items-center justify-center text-center px-4 md:px-6 pt-32 pb-12 relative z-10">
            <div className="w-full max-w-5xl mx-auto">
                {/* Main Content Container with Glass Effect */}
                <div className="relative p-1 md:p-3 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_rgba(0,128,255,0.15)]">

                    {/* Neon Glow Behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-3xl rounded-full -z-10 opacity-60"></div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                        {/* Aspect Ratio Container for Video */}
                        <div className="relative pb-[56.25%] h-0">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/MdLCaiY_5MQ?si=xl8vLYFPk_jfMq2o"
                                title="Flashmoon Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Optional Decorative Elements */}
                <div className="mt-8 flex justify-center gap-4">
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

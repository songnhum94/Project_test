import React from 'react';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center text-center px-5 pt-32 pb-16 relative z-10">
            <div className="w-full max-w-[900px]">
                <div className="p-5 w-full">
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/MdLCaiY_5MQ?si=xl8vLYFPk_jfMq2o"
                            title="Flashmoon Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div className="mt-8">
                </div>
            </div>
        </section>
    );
};

export default Hero;

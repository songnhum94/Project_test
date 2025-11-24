import React from 'react';

const featuresData = [
    {
        title: 'Flashmoon Platform',
        image: '/image/Platform.png',
        desc: 'The ultimate decentralized platform for seamless crypto transactions and interactions.',
        link: 'https://flashmoon.io/tutorial',
        linkText: 'Launch App',
        color: 'text-[var(--color-neon-blue)]',
        linkColor: 'text-white'
    },
    {
        title: 'Flash Moon Chart',
        image: '/image/FM Chart.jpeg',
        desc: 'Real-time analytics and charting tools to keep you ahead of the market trends.',
        link: 'https://www.geckoterminal.com/bsc/pools/0x9232056b89896429a0fa8fb5f84dde78afb43c57?utm_source=coingecko&utm_medium=referral&utm_campaign=searchresults',
        linkText: 'View Chart',
        color: 'text-[var(--color-neon-purple)]',
        linkColor: 'text-[var(--color-neon-purple)]'
    },
    {
        title: 'Flash Moon Swap',
        image: '/image/FM Coin.jpeg',
        desc: 'Instant, low-fee token swaps powered by our advanced liquidity protocol.',
        link: 'https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x7fEd362090f9ce6C68C7D95c9d5DFE29f511D5a9',
        linkText: 'Swap Now',
        color: 'text-[var(--color-neon-green)]',
        linkColor: 'text-[var(--color-neon-green)]'
    },
    {
        title: 'Flashmoon Card',
        image: '/image/CRYPTO CARDS.png',
        desc: 'An easy way to get your crypto spending power. Seamlessly convert and spend your assets worldwide.',
        link: 'https://flashmoon.io/Flashmoonshop',
        linkText: 'Get Card',
        color: 'text-[#ff00a3]',
        linkColor: 'text-[#ff00a3]'
    },
    {
        title: 'Staking Mode',
        image: '/image/Staking Mode.png',
        desc: 'Let your assets work for you. Secure staking pools with attractive APY rewards for holders.',
        link: 'https://flashmoon.io/flashmoon-staking',
        linkText: 'Start Staking',
        color: 'text-[var(--color-neon-green)]',
        linkColor: 'text-[var(--color-neon-green)]'
    },
    {
        title: 'Gacha & NFT',
        image: '/image/Gacha.png',
        desc: 'Try your luck with our unique Gacha system. Win rare NFTs and exclusive rewards.',
        link: 'https://flashmoon.io/flashmoon-gacha',
        linkText: 'Play Now',
        color: 'text-[var(--color-neon-gold)]',
        linkColor: 'text-[var(--color-neon-gold)]',
        target: '_blank'
    },
    {
        title: 'Flash Moon +',
        image: '/image/FM+.png',
        desc: 'Enhanced features for premium users. Unlock exclusive benefits and tools.',
        link: 'https://flashmoon.io/flashmoon-defi/plus/1/1/1',
        linkText: 'Learn More',
        color: 'text-[var(--color-neon-blue)]',
        linkColor: 'text-white'
    },
    {
        title: 'Flash Moon Super Plus',
        image: '/image/Super.jpeg',
        desc: 'The ultimate tier for serious investors. Maximum rewards and priority support.',
        link: 'https://flashmoon.io/flashmoon-defi/superplus/1/1/1',
        linkText: 'Upgrade Now',
        color: 'text-[var(--color-neon-purple)]',
        linkColor: 'text-[var(--color-neon-purple)]'
    },
    {
        title: 'WeB.30 DeFi',
        image: '/image/Web3.jpeg',
        desc: 'Comprehensive guides and tutorials to help you navigate the Flashmoon ecosystem.',
        link: 'https://flashmoon.io/flashmoon-defi',
        linkText: 'Read Guide',
        color: 'text-[var(--color-neon-green)]',
        linkColor: 'text-[var(--color-neon-green)]'
    }
];

const Features = () => {
    return (
        <section className="py-10 pb-24 px-0 relative z-10">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 max-w-[1200px] mx-auto px-6">
                {featuresData.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden flex flex-col border border-[rgba(255,255,255,0.05)] rounded-3xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] group hover:-translate-y-2.5 hover:scale-[1.02] hover:border-[rgba(255,255,255,0.3)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:bg-[rgba(255,255,255,0.07)]"
                    >
                        {/* Hover Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full pointer-events-none" />

                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-[200px] object-cover rounded-2xl mb-6 bg-[rgba(0,0,0,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                        />
                        <h3 className={`text-[1.4rem] mb-2.5 ${feature.color} font-bold`}>
                            {feature.title}
                        </h3>
                        <p className="text-[0.9rem] text-[#ddd] leading-relaxed mb-5 flex-grow">
                            {feature.desc}
                        </p>
                        <a
                            href={feature.link}
                            target={feature.target || '_self'}
                            className={`text-[0.9rem] font-bold ${feature.linkColor} no-underline flex items-center gap-1`}
                        >
                            {feature.linkText} <span>→</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const GlassAccordion = styled(Accordion)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px !important',
    marginBottom: '16px',
    color: '#fff',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: '0 0 16px 0',
        background: 'rgba(255, 255, 255, 0.07)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
}));

const faqData = [
    {
        question: 'What is Flashmoon?',
        answer: (
            <>
                <strong>FLASHMOON WEB3.0</strong> is a Decentralized Income Engine system that operates entirely on Smart Contracts on the Binance Smart Chain (BSC), using NFT Matrix Packages as its core income generation tool.
                <br /><br />
                Key Features: It distributes 100% commission directly to members' wallets and enforces a "Zero-Cut Policy," meaning the developers take no percentage cut from user earnings.
                <br /><br />
                Token: It features an FM token with a Hyper-Deflationary mechanism to reduce supply and increase long-term value.
            </>
        )
    },
    {
        question: 'Is Flashmoon decentralized?',
        answer: 'The FlashMoon platform is designed to have no single administrator or central authority in the form of an individual or company.'
    },
    {
        question: 'Who manages the platform?',
        answer: 'Although a group of Founders and Developers created and deployed the Smart Contract onto the blockchain, as of now, no single person or group controls the platform.'
    },
    {
        question: 'What is an NFT?',
        answer: (
            <>
                <strong>NFT</strong> stands for Non-Fungible Token, and it is a unique digital asset that cannot be duplicated or substituted, with its ownership recorded on Blockchain technology.
            </>
        )
    }
];

const FAQ = () => {
    return (
        <section className="py-16 pb-32 px-6 relative z-10 max-w-[800px] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-neon-blue)]">
                Frequently Asked Questions
            </h2>

            {faqData.map((item, index) => (
                <GlassAccordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'var(--color-neon-blue)' }} />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        sx={{
                            '& .MuiAccordionSummary-content': {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }
                        }}
                    >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-neon-blue)' }}>
                            {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ color: '#ddd', lineHeight: 1.6 }}>
                            {item.answer}
                        </Typography>
                    </AccordionDetails>
                </GlassAccordion>
            ))}
        </section>
    );
};

export default FAQ;

export const TRANSITION_EASE = [0.4, 0, 0.2, 1] as const; // Premium Boutique Ease
export const PAGE_TRANSITION_DURATION = 0.8;
export const SECTION_TRANSITION_DURATION = 0.7;
export const STAGGER_DELAY = 0.1;
export const HERO_STAGGER = 0.15;

export const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
    duration: PAGE_TRANSITION_DURATION,
    ease: TRANSITION_EASE,
};

export const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: SECTION_TRANSITION_DURATION,
            ease: TRANSITION_EASE,
            staggerChildren: STAGGER_DELAY
        }
    }
};

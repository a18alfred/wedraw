import React from 'react';
import { styles } from '@/shared/styles/custom';
import { motion } from 'framer-motion';

interface AnimatedSwitcherProps {
    isOn: boolean;
    toggle: () => void;
    theme: 'light' | 'dark';
}

const AnimatedSwitcher = React.memo(({ isOn, toggle, theme }: AnimatedSwitcherProps) => {
    return (
        <div className={`${styles.toggleSwitch[theme]} ${isOn ? 'justify-end' : 'justify-start'}`}
             onClick={toggle}
        >
            <motion.div
                className={`${styles.toggleSwitchHandle[theme]} ${isOn
                    ? styles.toggleSwitchHandleBgOn[theme]
                    : styles.toggleSwitchHandleBgOff[theme]}`}
                layout
                transition={spring}
            />
        </div>
    );
});

AnimatedSwitcher.displayName = 'AnimatedSwitcher';

const spring = {
    type: 'spring',
    stiffness: 600,
    damping: 30,
};


export default AnimatedSwitcher;

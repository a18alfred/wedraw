const styles = {
    paddingX: 'sm:px-16 px-6',

    heroHeadText:
        'text-white font-black lg:text-[80px] sm:text-[70px] xs:text-[60px] text-[40px] leading-tight  mt-2',
    heroSubText:
        'text-white-100 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px]',

    inputStyle:
        'bg-gray-100 w-full py-2 px-4 placeholder:text-secondary text-base text-black rounded-md outline-none font-medium',

    highlightedText:
        'flex items-center justify-between w-full gap-4 bg-gray-100 py-2 px-4 text-base text-black rounded-md font-medium  ',

    chatContainer: 'absolute bottom-[-400px] z-chat-full flex h-[400px] w-full flex-col overflow-hidden md:w-[40rem] md:right-[70px] md:z-chat-small shadow-card border-t border-breaker',

    tooltipButton: {
        control: 'rounded-[50%] h-9 w-9 flex items-center justify-center text-xl bg-tertiary',
        tool: 'flex items-center justify-center text-xl sm:text-2xl',
        context: 'rounded-[50%] p-2 flex items-center justify-center text-base bg-tertiary',
    },

    toggleSwitch: {
        dark: 'w-[44px] h-[24px] bg-white bg-opacity-30 flex rounded-full p-[4px] cursor-pointer',
        light: 'w-[44px] h-[24px] bg-primary bg-opacity-30 flex rounded-full p-[4px] cursor-pointer',
    },

    toggleSwitchHandle: {
        dark: 'w-[16px] h-[16px] rounded-full',
        light: 'w-[16px] h-[16px] rounded-full',
    },

    toggleSwitchHandleBgOn: {
        dark: 'bg-white',
        light: 'bg-tertiary',
    },

    toggleSwitchHandleBgOff: {
        dark: 'bg-tertiary',
        light: 'bg-white',
    },

    avatar: 'flex h-6 w-6 select-none items-center justify-center rounded-full text-center text-sm opacity-50 cursor-pointer',
};

export { styles };
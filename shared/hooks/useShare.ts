interface OnShareProps {
    title: string;
}

export const useShare = () => {
    const canShare = !!navigator.share;

    const onShare = async ({ title }: OnShareProps) => {
        try {
            await navigator
                .share({
                    title: title,
                    url: document.location.href,
                });
        } catch (err) {
            console.error(err);
        }
    };

    return {
        canShare,
        onShare,
    };
};
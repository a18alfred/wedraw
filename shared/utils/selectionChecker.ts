interface CheckNewSelectionProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const checkNewSelection = ({ x, y, width, height }: CheckNewSelectionProps): CheckNewSelectionProps => {
    if (width < 0) {
        width -= 4;
        x += 2;
    } else {
        width += 4;
        x -= 2;
    }
    if (height < 0) {
        height -= 4;
        y += 2;
    } else {
        height += 4;
        y -= 2;
    }
    return {
        x, y, width, height,
    };
};

export const fixSelectionDimensions = ({ x, y, width, height }: CheckNewSelectionProps): CheckNewSelectionProps => {
    if (width < 0) {
        width += 4;
        x -= 2;
    } else {
        width -= 4;
        x += 2;
    }
    if (height < 0) {
        height += 4;
        y -= 2;
    } else {
        height -= 4;
        y += 2;
    }

    return {
        x, y, width, height,
    };
};


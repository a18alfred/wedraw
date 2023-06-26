import { useState } from 'react';

type List<T> = {
    items: T[];
    addItem: (item: T) => void;
    removeItem: (index: number) => void;
    clearList: () => void;
};

function useList<T>(initialList: T[] = []): List<T> {
    const [items, setItems] = useState<T[]>(initialList);

    const addItem = (item: T) => {
        setItems([...items, item]);
    };

    const removeItem = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const clearList = () => {
        setItems([]);
    };

    return { items, addItem, removeItem, clearList };
}

export default useList;

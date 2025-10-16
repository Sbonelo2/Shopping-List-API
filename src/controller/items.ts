import { ShoppingItem } from '../types/items';

let items: ShoppingItem[] = [];

let currentId = 0;
export const getItems = (): ShoppingItem[] => {
    return items;
}
export const getItemById = (id: number): ShoppingItem | undefined => {
    const item = items.find(item => item.id === id);
    return item;
}
export const addItem = (name: string, quantity: number, purchasedStatus: boolean): ShoppingItem => {
    const newItem: ShoppingItem = {
        id: currentId++,
        name,
        quantity,
        purchasedStatus,
    }
    items.push(newItem);
    return newItem;
}

export const updateItem = (id: number, name?: string, quantity?: number, purchasedStatus?: boolean): ShoppingItem | undefined => {
    const item = items.find(item => item.id === id);
    if (!item) {
        return undefined;
    }
    if (name !== undefined) {
        item.name = name;
    }
    if (quantity !== undefined) {
        item.quantity = quantity;
    }
    if (purchasedStatus !== undefined) {
        item.purchasedStatus = purchasedStatus;
    }
    return item;
}
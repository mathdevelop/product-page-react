import { atom } from 'recoil';

export const temporaryCartState = atom({
    key: 'temporaryCartState',
    default: {
        variations: {}
    }
});

export const cartState = atom({
    key: 'cartState',
    default: {
        open: false,
        items: []
    }
});

export const lightboxState = atom({
    key: 'lightboxState',
    default: {
        open: false
    }
});
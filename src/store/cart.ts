import { reactive, computed } from 'vue';

type Cart = {
    items: CartItem[];
};

type CartItem = {
    stock_id: number;
    amount: number;
};

const state = reactive({
    cart: null,
});

const getCart = computed((): Cart => state.cart);

const getCartItemsCount = computed(
    (): number => state.cart?.items?.length || 0
);

const setCart = (cartData: Cart): void => {
    state.cart = cartData;
};

const addToCart = (orderItemData: CartItem): void => {
    if (!state.cart) {
        state.cart = {};
    }

    if (!state.cart.items || !state.cart.items.length) {
        state.cart.items = [];
    }

    state.cart.items.push(orderItemData);
};

const removeFromCart = (id, amount): void => {
    if (!state.cart || !state.cart.items) {
        return;
    }

    state.cart.items = state.cart.items.filter((item) => {
        return (item.stock_id !== id) && (item.amount !== amount);
    });
};

const cartStore = {
    getCart,
    getCartItemsCount,
    setCart,
    addToCart,
    removeFromCart,
};

export default cartStore;

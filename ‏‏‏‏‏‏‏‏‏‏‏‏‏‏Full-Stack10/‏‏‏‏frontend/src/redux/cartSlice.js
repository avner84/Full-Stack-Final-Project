import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartProducts: [],
    totalAmount: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {

            const product = action.payload.product;
            const quantity = action.payload.quantity;

            const existingProduct = state.cartProducts.find(
                (p) => p.productId === product.productId
            );
            if (existingProduct) {
                existingProduct.amount += quantity;

            } else {
                const newProduct = Object.assign(product, { amount: quantity })

                state.cartProducts.push(newProduct);
            }

            //=====
            let amount = 0;
            let total = 0;
            state.cartProducts.forEach((product) => {
                amount += product.amount;
                total += product.amount * product.price;
            });
            state.totalAmount = amount;
            state.totalPrice = total;

        },
        updateProductAmount: (state, action) => {
            const product = action.payload.product;
            const quantity = action.payload.quantity;

            const existingProduct = state.cartProducts.find(
                (p) => p.productId === product.productId
            );

            if (existingProduct) {
                existingProduct.amount = quantity;
                let amount = 0;
                let total = 0;
                state.cartProducts.forEach((product) => {
                    amount += product.amount;
                    total += product.amount * product.price;
                });
                state.totalAmount = amount;
                state.totalPrice = total;

            }
        },
        removeProduct: (state, action) => {
            const productId = action.payload;
            state.cartProducts = state.cartProducts.filter(product => product.productId !== productId);
            if (state.cartProducts.length > 0) {
                let amount = 0;
                let total = 0;
                state.cartProducts.forEach((product) => {
                    amount += product.amount;
                    total += product.amount * product.price;
                });
                state.totalAmount = amount;
                state.totalPrice = total;
            }

            else {
                state.totalAmount = 0;
                state.totalPrice = 0;
            }

        },
    }
})

export const { addProduct, updateProductAmount, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;

// console.log('cartSlice :', cartSlice);
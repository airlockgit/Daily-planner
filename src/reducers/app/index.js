import initialState from '../../store/initstate';

export const appReducers = (state = initialState.app, action) => {//
    let services = state.services;

    switch (action.type) {
        case 'ISLOADING':
            return {
                ...state,
                services: {
                    ...services,
                    isLoading: action.payload,
                }
            };
        case 'PRODUCTS_RECEIVED':
            return {
                ...state,
                services: {
                    ...services,
                    products: action.payload,
                }
            };
        case 'PRODUCT_RECEIVED':
            return {
                ...state,
                services: {
                    ...services,
                    product: action.payload,
                }
            };
        case 'ISERROR':
            return {
                ...state,
                services: {
                    ...services,
                    error: action.payload,
                }
            };
        default:
            return state;
    }
}
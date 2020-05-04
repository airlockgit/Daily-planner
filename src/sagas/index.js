import { call, put, takeEvery, takeLatest, all, take } from 'redux-saga/effects';
import Api from '../api';

const delay = ms => new Promise(res => setTimeout(res, ms))

function* isLoadingDefault(param) {
    yield put({ type: 'ISLOADING', payload: param })
    yield put({ type: 'ISERROR', payload: param })
}

function* fetchProducts() {
    yield call(isLoadingDefault, false)
    yield delay(2000)

    const response = yield call(Api.fetchProducts)

    if (response) {
        yield put({ type: 'PRODUCTS_RECEIVED', payload: response.data })
        yield call(isLoadingDefault, true)
    } else {
        yield put({ type: 'ISERROR', payload: true })
    }
}

function* fetchProduct(action) {
    yield call(isLoadingDefault, false)
    yield delay(2000)//долгая загрузка

    const response = yield call(Api.fetchProduct, action.id)

    if (response) {
        yield put({ type: 'PRODUCT_RECEIVED', payload: response.data })
        yield call(isLoadingDefault, true)
    } else {
        yield put({ type: 'ISERROR', payload: true })
    }
}

function* watchFetchProducts() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('FETCH_PRODUCT', fetchProduct);
}

export function* rootSaga() {
    yield all([
        watchFetchProducts()
    ])
}
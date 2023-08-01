import instance from './instance';

export const getAll = () => {
    const url = "/products";
    return instance.get(url);
}
export const add = (product:any) => {
    const url = "/products";
    return instance.post(url, product);
}
export const get = (id:any) => {
    const url = "/products/" + id;
    return instance.get(url);
}

export const removeProduct = (id:any) => {
    const url = "/products/" + id;
    return instance.delete(url);
}
export const update = (product:any) => {
    const url = "/products/" + product.id;
    return instance.put(url,product);
}
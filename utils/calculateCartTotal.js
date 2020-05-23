function calculateCartTotal(products){
    const total = products.reduce((acc, el) => {
        acc += el.product.price * el.quantity;
        return acc;
    }, 0);

    const cartTotal = ((total * 100) / 100).toFixed(2); // round up the total by x 100 / 100 and make it 2 decimal places
    const stripeTotal = Number((total * 100).toFixed(2));

    return {cartTotal, stripeTotal};
}

export  default calculateCartTotal;
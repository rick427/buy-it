import {Header, Segment, Button, Icon, Item} from 'semantic-ui-react';
import {useRouter} from 'next/router';

function CartItemList({user, products}) {
  const router = useRouter();

  function mapCartProductToItems(products){
    return products.map(prod => ({
      childKey: prod.product._id,
      header: (
        <Item.Header as="a" onClick={() => router.push(`/product?_id=${prod.product._id}`)}>
          {prod.product.name}
        </Item.Header>
      ),
      image: prod.product.mediaUrl,
      meta: `${prod.quantity} x ${prod.product.price}`,
      fluid: 'true',
      extra: (
        <Button basic icon="remove" floated="right" onClick={() => console.log('ll')}/>
      )
    }))
  }

  if(products.length === 0){
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping cart"/>
          No products in your cart
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push('/')}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push('/login')}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  return (
    <Item.Group
      divided
      items={mapCartProductToItems(products)}
    />
  )
}

export default CartItemList;

import {Header, Button} from 'semantic-ui-react';

function ProductAttributes({description}) {
  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button color="red" content="Delete Product" icon="trash alternate outline"/>
    </>
  );
}

export default ProductAttributes;

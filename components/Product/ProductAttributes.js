import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Header, Button, Modal} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

function ProductAttributes({description, _id}) {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  async function handleDelete(){
    const url = `${baseUrl}/api/product`;
    const payload = {params: {_id}};
    await axios.delete(url, payload);
    router.push('/');
  }

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button 
        color="red" 
        content="Delete Product" 
        icon="trash alternate outline"
        onClick={() => setModal(true)}
      />

      <Modal open={modal} size="small" dimmer="blurring" centered={false}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this product ?</p>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={() => setModal(false)} content="cancel"/>
          <Button 
            negative 
            icon="trash" 
            labelPosition="right" 
            content="delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;

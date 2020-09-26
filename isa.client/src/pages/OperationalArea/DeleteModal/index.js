import * as Yup from 'yup';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import { createOperationalAreaRequest } from '~/store/modules/operationalArea/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O campo Nome é obrigatório.'),
});

export default function DeleteModal() {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(data) {
    dispatch(createOperationalAreaRequest(data));
  }

  return (
    <>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          on
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              color: '#000000',
              borderRadius: '18px',
              width: '736px',
            },
            overlay: {
              backgroundColor: '#121214e6',
            },
          }}
        >
          <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
            <h3>Nova Área Operacional</h3>
            <div className="row-cols mt-3">
              <Input
                className="form-control"
                name="title"
                type="text"
                placeholder="Nome da Área Operacional"
              />
              <hr />
              <section className="row d-flex justify-content-end">
                <div className="col-1" />
                <div className="col-1">
                  <button type="submit" className="btn btn-secondary">
                    Salvar
                  </button>
                </div>
              </section>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
}

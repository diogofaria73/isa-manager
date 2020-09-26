import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

export default function BaseModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} type="button">
        Open Modal
      </button>
      <div>
        <Modal
          className="modal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal} type="button">
            close
          </button>
          <div>I am a modal</div>
          <form>
            <input />
            <button type="button">tab navigation</button>
            <button type="button">stays</button>
            <button type="button">inside</button>
            <button type="button">the modal</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

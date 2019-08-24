import React from 'react';
// import ReactDOM from 'react-dom';

import Modal from './components/Modal';

const Message = () => (
  <div>
    <p>
      Scan QR using your MetaStamp application
    </p>
    <img alt="Your mama" src="https://avatars0.githubusercontent.com/u/7525670?v=4" />
  </div>
);

const ExamplePageOne = () => (
  <main>
    <h1>React Modal</h1>
    <Modal
      title="Scan QR code"
      message={<Message />}
      btn="Link MetaStamp"
      color="primary"
    />
  </main>
);

export default ExamplePageOne;

import React from 'react';

import Modal from './components/Modal';

const Message = () => (
  <div>
    <p>
      Scan QR using your MetaStamp application
    </p>
    <img alt="Your mama" src="https://avatars0.githubusercontent.com/u/7525670?v=4" />
  </div>
);

const Settings = () => (
  <main>
    <h1>Settings</h1><br />
    <h3>Link your account to MetaStamp</h3><br />
    <Modal
      title="Scan QR code"
      message={<Message />}
      btn="Link MetaStamp"
      color="primary"
    />
  </main>
);

export default Settings;

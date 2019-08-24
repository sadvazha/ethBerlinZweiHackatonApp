import React from 'react';
import QRCode from 'qrcode.react';

import Modal from './components/Modal';

const Message = () => (
  <div>
    <p>
      Scan QR using your MetaStamp application
    </p>
    <br />
    <center>
      <QRCode value="http://facebook.github.io/react/" />
    </center>
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
      header
    />
  </main>
);

export default Settings;

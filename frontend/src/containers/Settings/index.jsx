import React from 'react';
import QRCode from 'qrcode.react';

import Modal from './components/Modal';

import socket from '../../utils/socket';

class Message extends React.Component {
  state = {
    success: false,
    id: null,
  }

  componentDidMount() {
    socket.requestId((id) => {
      this.setState({
        id,
      });
    });

    socket.registerHandler(() => {
      this.setState({
        success: true,
      });
    });
  }

  render() {
    const { success, id } = this.state;
    return (
      <div>
        <p>
          Scan QR using your MetaStamp application
        </p>
        <br />
        {!success && (
          <center>
            <QRCode value={`http://facebook.github.io/react/${id}`} />
          </center>
        )}
        {success && (
          <center>
            Success!
          </center>
        )}
      </div>
    );
  }
}

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

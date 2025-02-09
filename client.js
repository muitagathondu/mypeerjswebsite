const peer = new Peer('1', {
    host: 'https://myotherpeerjs.onrender.com', // Replace with your Render service name
    port: 443,        // Use 443 for HTTPS
    path: '/myapp',
    secure: true      // Ensure the connection is secure
  });
  
  peer.on('open', (id) => {
    console.log('Connected to PeerJS server with ID:', id);
  });
  
  peer.on('error', (err) => {
    console.error('Error:', err);
  });
  
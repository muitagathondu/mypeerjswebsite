

  // Global peer variable


// Global peer variable
let peer;

// Updated `init` function with only `userId` as a parameter
window.init = async function init(userId) {
    try {
       // const ipAddress = await fetchIpFromFirestore(); // Fetch IP address
       // console.log("Initializing Peer with IP:", ipAddress);

        peer = new Peer(userId, {
        
         host:'mypeerjswebsite.onrender.com',

         // host:'192.168.100.6',

         // host:'localhost',

        

     
          
         // port: 443, // HTTPS default port

          port: 9000, // HTTPS default port
      

          // path: '/peerjs',

           path: '/',

          
       
          // secure: true ,// Use secure connections,

        

        });

        peer.on('open', () => {
          //  Android.onPeerConnected(); // Ensure this is being called
            console.log("Peer connected successfully.");
        });

        listen(); // Start listening for calls
    } catch (error) {
        console.error("Error initializing Peer:", error);
    }
}

// Function to listen for calls
let localStream;
function listen() {
    peer.on('call', (call) => {
        navigator.getUserMedia(
            { audio: true, video: true },
            (stream) => {
                localVideo.srcObject = stream;
                localStream = stream;

                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    remoteVideo.srcObject = remoteStream;

                    remoteVideo.className = "primary-video";
                    localVideo.className = "secondary-video";
                });
            }
        );
    });
}


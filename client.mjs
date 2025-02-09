

// Video Elements
let localVideo = document.getElementById("local-video");
let remoteVideo = document.getElementById("remote-video");

localVideo.style.opacity = 0;
remoteVideo.style.opacity = 0;

localVideo.onplaying = () => { localVideo.style.opacity = 1 };
remoteVideo.onplaying = () => { remoteVideo.style.opacity = 1 };




  // Global peer variable


// Global peer variable
let peer;

// Updated `init` function with only `userId` as a parameter
window.init = async function init(userId) {
    try {
       // const ipAddress = await fetchIpFromFirestore(); // Fetch IP address
       // console.log("Initializing Peer with IP:", ipAddress);

        peer = new Peer(userId, {
        
         host:'myotherpeerjs.onrender.com',

         key: process.env.PEERJS_KEY,

         // host:'192.168.100.6',

         // host:'localhost',

        

     
          
         port: 443, // HTTPS default port

         // port: 9000, // HTTPS default port
      

          // path: '/peerjs',

           path: '/myapp',

          
       
          secure: true ,// Use secure connections,

        

        });

        peer.on('open', () => {
          //  Android.onPeerConnected(); // Ensure this is being called
            console.log("Peer connected successfully.");
        });

        peer.on('error', (err) => {
          console.error('PeerJS error:', err); // Log the error to the console
          // Optionally, display the error to the user:
          alert('A PeerJS error occurred: ' + err.message); // Be careful with alerts in production
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

// Function to start a call
window.startCall = function startCall(otherUserId) {
  navigator.getUserMedia(
      { audio: true, video: true },
      (stream) => {
          localVideo.srcObject = stream;
          localStream = stream;

          const call = peer.call(otherUserId, stream);
          call.on('stream', (remoteStream) => {
              remoteVideo.srcObject = remoteStream;

              remoteVideo.className = "primary-video";
              localVideo.className = "secondary-video";
          });
      }
  );
}

// Toggle video
function toggleVideo(b) {
  if (b === "true") {
      localStream.getVideoTracks()[0].enabled = true;
  } else {
      localStream.getVideoTracks()[0].enabled = false;
  }
}

// Toggle audio
function toggleAudio(b) {
  if (b === "true") {
      localStream.getAudioTracks()[0].enabled = true;
  } else {
      localStream.getAudioTracks()[0].enabled = false;
  }
}











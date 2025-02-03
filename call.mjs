// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

 
 // Initialize Firebase
 //const app = initializeApp(firebaseConfig);

 //const db = getFirestore(app);

 // Function to fetch IP address from Firestore
//async function fetchIpFromFirestore() {
//  const docRef = doc(db, "myip", "myipdocument");
/// try {
    //  const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
     //     const ipAddress = docSnap.data().ip || "localhost";
     //     console.log("Retrieved IP from Firestore:", ipAddress);


          // Update HTML textbox with the retrieved IP
      //                ipAddressInput.value = ipAddress;

      //    return ipAddress;
    //  } else {
     //     console.error("Document does not exist in Firestore");
      //    return "localhost"; // Default fallback
    //  }
 // } catch (error) {
      //console.error("Error fetching IP from Firestore:", error);
      //return "localhost"; // Default fallback in case of an error
 // }
//}




// Video Elements
let localVideo = document.getElementById("local-video");
let remoteVideo = document.getElementById("remote-video");

localVideo.style.opacity = 0;
remoteVideo.style.opacity = 0;

localVideo.onplaying = () => { localVideo.style.opacity = 1 };
remoteVideo.onplaying = () => { remoteVideo.style.opacity = 1 };

// Global peer variable
let peer;

// Updated `init` function with only `userId` as a parameter
window.init = async function init(userId) {
    try {
       // const ipAddress = await fetchIpFromFirestore(); // Fetch IP address
       // console.log("Initializing Peer with IP:", ipAddress);

        peer = new Peer(userId, {
        
          host:'mypeerjswebsite.onrender.com',

        

     port: 443, // HTTPS default port
      

           path: '/peerjs',

          
       
           secure: true ,// Use secure connections,

        

        });

        peer.on('open', () => {
            Android.onPeerConnected(); // Ensure this is being called
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













//fetchIpFromFirestore();




  // Global peer variable
let peer;

// Updated `init` function with only `userId` as a parameter
window.onload = async function init(userId) {
    try {
       // const ipAddress = await fetchIpFromFirestore(); // Fetch IP address
       // console.log("Initializing Peer with IP:", ipAddress);

        peer = new Peer(userId, {
        
        host:'mypeerjswebsite.onrender.com',

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

        listen(); // Start listening for calls
    } catch (error) {
        console.error("Error initializing Peer:", error);
    }
}
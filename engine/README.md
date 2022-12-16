# The qwantify engine

this is where all the magic happens: 
1. Serving the website
2. Handling the login stuff
3. Banning, enabling gamepads etc
4. RunnRelaying the video stream from the running game to the web browser 

Contains two 'parent' directories:
1. Client -  `nextjs webpage`
2. Server -  `go backend serving a http endpoint and serving game stream through WebRTC`

## Getting started

1. Install nodejs v18.12.1 or higher

2. Install  go v1.19.3 or higher


### Client
To run client first install yarn
   ```bash
   npm install -g yarn
   ```

Then install node_modules
   ```bash
   yarn install
   ```
Finally, run in dev mode
   ```bash
   yarn dev
   ```

This should server the webpage on port 3000
 ```bash 
 http://localhost:3000
 ```

### Server
To run the server part of qwantify engine;

```bash
cd server && go run qwantify.go
```

Everything set.

>Happy hacking :)

### FAQ
1. Why Go?
   
   Well, Go has the best documented webRTC library out there [pion-webrtc](https://github.com/pion/webrtc) built from scratch.
   
   Some cool features include [single ICE port](https://github.com/pion/webrtc/tree/master/examples/ice-single-port), [RTP to WebRTC forwarding](https://github.com/pion/webrtc/tree/master/examples/rtp-to-webrtc).

  > The Best webRTC library of our time.
2. Why NextJS?
   I am probably a little biased, but NextJs is the best React framework out there. With [server-side rendering](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props), [dynamic routing](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) and many more cool features.

   It's probably too much for such a project, but who knows...
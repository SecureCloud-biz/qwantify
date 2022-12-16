import React from "react";

interface Props {
    videoParentRef: React.RefObject<HTMLDivElement>
}

export function StreamVideo({ videoParentRef }: Props) {
    const pc = new RTCPeerConnection({
        iceServers: [{
            urls: 'stun:stun.l.google.com:19302'
        }]
    })
    const log = (msg: string) => {
        console.log(msg)
    }

    pc.ontrack = function (event) {
        const el: HTMLVideoElement = document.createElement(event.track.kind)
        el.srcObject = event.streams[0]
        el.autoplay = true
        el.controls = true

        //@ts-ignore
        videoParentRef.appendChild(el)
    }

    pc.oniceconnectionstatechange = e => log(pc.iceConnectionState)
    pc.onicecandidate = event => {
        if (event.candidate === null) {
            console.log(Buffer.from(JSON.stringify(pc.localDescription)))
            // document.getElementById('localSessionDescription').value = btoa(JSON.stringify(pc.localDescription))
        }
    }


    // Offer to receive 1 audio, and 1 video track
    pc.addTransceiver('video', {
        direction: 'sendrecv'
    })
    pc.addTransceiver('audio', {
        direction: 'sendrecv'
    })

    pc.createOffer().then(d => pc.setLocalDescription(d)).catch(log)

    window.startSession = () => {
        // const sd = document.getElementById('remoteSessionDescription').value
        if (sd === '') {
          return alert('Session Description must not be empty')
        }
      
        try {
          pc.setRemoteDescription(JSON.parse(atob(sd)))
        } catch (e) {
          alert(e)
        }
      }
}
import React, { useEffect, useRef, useState } from "react";

export default function Main() {
  const iceSelectedPairs = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pc = new RTCPeerConnection();

    const createPeerConnection = () => {
      let dc = pc.createDataChannel('data');

      pc.oniceconnectionstatechange = (ev) => {
        console.log("ice connection changed", ev)
      }

      dc.onopen = () => {
        let el = document.createElement('template')
        //@ts-expect-error
        let selectedPair = pc.sctp.transport.iceTransport.getSelectedCandidatePair()

        console.log("senders", selectedPair)

        el.innerHTML = `<div>
        <ul>
           <li> <i> Local</i> - ${selectedPair.local.candidate}</li>
           <li> <i> Remote</i> - ${selectedPair.remote.candidate} </li>
        </ul>
      </div>`
        if (iceSelectedPairs.current && el.content.firstChild) {
          iceSelectedPairs.current.appendChild(el.content.firstChild);
        } else {
          console.log("no iceRef or el.firstChild")
        }
      }

      pc.createOffer()
        .then(offer => {
          pc.setLocalDescription(offer)

          console.log(offer)

          return fetch(`http://localhost:8080/doSignaling`, {
            method: 'post',
            body: JSON.stringify(offer)
          })
        })
        .then(res => res.json())
        .then(res => pc.setRemoteDescription(res))
        .catch(err => console.error(err))
    }

    for (let i = 0; i < 10; i++) {
    createPeerConnection()
    }

  }, [])

  return (
    <div>
      <h3> ICE Selected Pairs </h3>
      <div ref={iceSelectedPairs} ></div> <br />
    </div>
  )
}
package session

import (
	"github.com/wanjohiryan/qwantify/constants"
	"github.com/wanjohiryan/qwantify/ws"
)

// TODO: start game programmatically

func startGame() error {
	//TODO call wine game here
	return nil
}

func stopGame() error {
	//TODO call wine game here
	return nil
}

func sendIceCandidate(wsConn *ws.Connection, candidate string) error {
	return wsConn.Send(ws.Message{
		Type: constants.IceCandidateMessage,
		Data: candidate,
	})
}

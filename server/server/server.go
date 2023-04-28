package server

import (
	"dnd-server/config"
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type handler func(http.ResponseWriter, http.Request)
type sHandlers map[string]http.HandlerFunc

type Server struct {
	handlers sHandlers
	config   config.Config
}

func NewServer() *Server {
	return &Server{
		handlers: make(sHandlers),
		config:   config.LoadConfig(),
	}
}

func (s *Server) AddHandler(name string, fn http.HandlerFunc) {
	s.handlers[name] = http.HandlerFunc(fn)
}

func (s *Server) Up() {
	mux := http.NewServeMux()

	if s.handlers["get-db"] != nil {
		mux.HandleFunc(fmt.Sprintf("/%s", s.config.DbRequestPath), s.handlers["get-db"])
		// http.Handle(fmt.Sprintf("/%s", s.config.DbRequestPath), s.handlers["get-db"])
	}

	fmt.Println("http server is listening on port ", s.config.Port)
	handler := cors.Default().Handler(mux)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", s.config.Port), handler); err != nil {
		log.Fatal(err)
	}
}

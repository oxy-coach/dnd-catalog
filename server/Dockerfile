FROM golang:1.20-alpine

ADD . /go/src/dnd-server
WORKDIR /go/src/dnd-server

RUN apk add build-base

RUN go mod download

RUN CGO_ENABLED=1 GOOS=linux go build -o /dnd-server-build

ENTRYPOINT "/dnd-server-build"

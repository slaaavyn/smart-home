smart home
============

This is backend server for control IoT devices via REST & WebSocket.  

## Implemented functionality and TODO:

- [x] Authorization via JWT with roles
- [x] Users management via REST
- [ ] Rooms management via REST
- [ ] Device management via REST
- [ ] Device management via WS
- [ ] Device WS server
- [ ] Client WS server
- [ ] implement frontend client
    

## Running the application on Docker

The application can be started on Docker using the following command:

~~~
$ docker pull slaaavyn/smart-home:latest
$ docker run \
    --name=<container_name> \
    --port=8080:8080 \\
~~~ 

## Docs

* [REST api doc](https://slaaavyn.github.io/smart-home/)
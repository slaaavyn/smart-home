define({ "api": [
  {
    "type": "post",
    "url": "/api/auth",
    "title": "Authentication, generate token",
    "name": "Auth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"root\",\n  \"password\": \"toor\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Root object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response.user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.role",
            "description": "<p>Role of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.token",
            "description": "<p>JWT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.tokenExpired",
            "description": "<p>Date when JWT expires</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.refreshToken",
            "description": "<p>Refresh token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.refreshTokenExpired",
            "description": "<p>Date when refresh token expires</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n{\n  \"user\": {\n   \"_id\":\n   \"username\": \"user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  },\n  \"token\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n  \"tokenExpired\": \"2020-08-15T14:19:41.459Z\",\n  \"refreshToken\": \"ff2d9f34-971b-49d8-98a5-1964a6b52c59\",\n  \"refreshTokenExpired\": \"2020-08-22T14:19:41.459Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.route.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>When (item || route) not exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>When trying to serve the request with incorrect data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "NotFound Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"status\": 404,\n   \"message\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"message\": \"field username must be exist\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/refresh-token",
    "title": "Refresh token",
    "name": "RefreshToken",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Refresh token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"root\",\n  \"password\": \"ff2d9f34-971b-49d8-98a5-1964a6b52c59\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Root object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response.user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.role",
            "description": "<p>Role of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.token",
            "description": "<p>JWT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.tokenExpired",
            "description": "<p>Date when JWT expires</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.refreshToken",
            "description": "<p>Refresh token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.refreshTokenExpired",
            "description": "<p>Date when refresh token expires</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n{\n  \"user\": {\n   \"_id\":\n   \"username\": \"user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  },\n  \"token\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n  \"tokenExpired\": \"2020-08-15T14:19:41.459Z\",\n  \"refreshToken\": \"ff2d9f34-971b-49d8-98a5-1964a6b52c59\",\n  \"refreshTokenExpired\": \"2020-08-22T14:19:41.459Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.route.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>When (item || route) not exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>When trying to serve the request with incorrect data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "NotFound Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"status\": 404,\n   \"message\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"message\": \"field username must be exist\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/room?roomName=Main",
    "title": "Create room",
    "name": "CreateRoom",
    "group": "Room",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roomName",
            "description": "<p>Name for the room</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "room",
            "description": "<p>Room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room._id",
            "description": "<p>ID of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room.name",
            "description": "<p>name of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "room.devices",
            "description": "<p>List of devices in room</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n  {\n   \"_id\":\n   \"name\": \"Main\",\n   \"devices\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/room.route.js",
    "groupTitle": "Room",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>When item must be unique and similar item already exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n   \"status\": 409,\n   \"message\": \"User already exist\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/room/:roomId",
    "title": "Get device by id",
    "name": "GetRoom",
    "group": "Room",
    "permission": [
      {
        "name": "[ROLE_ADMIN, ROLE_USER]"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roomId",
            "description": "<p>Room unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "room",
            "description": "<p>Room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room._id",
            "description": "<p>ID of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "room.devices",
            "description": "<p>List of devices in room</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n{\n \"_id\":\n \"name\": \"a_room\",\n \"devices\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/room.route.js",
    "groupTitle": "Room",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/room",
    "title": "List all rooms",
    "name": "GetRoomLst",
    "group": "Room",
    "permission": [
      {
        "name": "[ROLE_ADMIN, ROLE_USER]"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rooms",
            "description": "<p>List of rooms</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rooms.room",
            "description": "<p>Room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rooms.room._id",
            "description": "<p>ID of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rooms.name",
            "description": "<p>name of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rooms.room.devices",
            "description": "<p>List of devices in room</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n[\n  {\n   \"_id\":\n   \"name\": \"a_room\",\n   \"devices\": []\n  },\n  {\n   \"_id\":\n   \"username\": \"b_room\",\n   \"devices\": []\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/room.route.js",
    "groupTitle": "Room",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/room/:roomId?roomName=newName",
    "title": "Update room name",
    "name": "UpdateRoom",
    "group": "Room",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roomId",
            "description": "<p>Room unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roomName",
            "description": "<p>Name for the room</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "room",
            "description": "<p>Room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room._id",
            "description": "<p>ID of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room.name",
            "description": "<p>name of the room</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "room.devices",
            "description": "<p>List of devices in room</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n  {\n   \"_id\":\n   \"name\": \"newName\",\n   \"devices\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/room.route.js",
    "groupTitle": "Room",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>When item must be unique and similar item already exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n   \"status\": 409,\n   \"message\": \"User already exist\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/create",
    "title": "Create user",
    "name": "CreateUser",
    "group": "User",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username for the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>FirstName for the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName for the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ROLE_ADMIN\"",
              "\"ROLE_USER\"",
              "\"ROLE_DEVICE\""
            ],
            "optional": false,
            "field": "role",
            "description": "<p>Role for the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"root\",\n  \"password\": \"toor\",\n  \"firstName\": \"admin\",\n  \"lastName\": \"admin\",\n  \"role\": \"ROLE_ADMIN\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>Role of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n  {\n   \"_id\":\n   \"username\": \"user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>When item must be unique and similar item already exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n   \"status\": 409,\n   \"message\": \"User already exist\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/room/:roomId",
    "title": "Delete room by id",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roomId",
            "description": "<p>Room unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/room.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>When (item || route) not exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "NotFound Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"status\": 404,\n   \"message\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/user/:userId",
    "title": "Delete user by id",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>When (item || route) not exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "NotFound Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"status\": 404,\n   \"message\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/:userId",
    "title": "Get user by id",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>Role of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n  {\n   \"_id\":\n   \"username\": \"user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>When (item || route) not exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "NotFound Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"status\": 404,\n   \"message\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/user",
    "title": "List all users",
    "name": "GetUserList",
    "group": "User",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.role",
            "description": "<p>Role of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n[\n  {\n   \"_id\":\n   \"username\": \"a_user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  },\n  {\n   \"_id\":\n   \"username\": \"b_user\",\n   \"firstName\": \"Viktor\"\n   \"lastName\": \"Lindeman\"\n   \"role\": \"ROLE_USER\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/update-password",
    "title": "Update user password",
    "name": "UpdatePassword",
    "group": "User",
    "permission": [
      {
        "name": "any roles"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Current user password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New password for the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"oldPassword\": \"toor\",\n  \"newPassword\": \"newToor\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>Role of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n  {\n   \"_id\":\n   \"username\": \"user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>When trying to serve the request with incorrect data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"message\": \"field username must be exist\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/user/:userId",
    "title": "Update user by id",
    "name": "UpdateUser",
    "group": "User",
    "permission": [
      {
        "name": "ROLE_ADMIN"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>FirstName for the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>LastName for the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"ROLE_ADMIN\"",
              "\"ROLE_USER\"",
              "\"ROLE_DEVICE\""
            ],
            "optional": true,
            "field": "role",
            "description": "<p>Role for the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"firstName\": \"newFirstName\",\n  \"lastName\": \"newLastName\",\n  \"role\": \"ROLE_ADMIN\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>FirstName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>LastName of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>Role of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 Success\n  {\n   \"_id\":\n   \"username\": \"user\",\n   \"firstName\": \"Anton\"\n   \"lastName\": \"Gusev\"\n   \"role\": \"ROLE_ADMIN\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>header value must follow the pattern &quot;Bearer [token sting]&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT is missing or not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>There was an internal error when trying to serve the request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>When (item || route) not exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>When trying to serve the request with incorrect data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalError Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 500,\n  \"message\": \"There was an internal error when trying to serve the request\"\n}",
          "type": "json"
        },
        {
          "title": "NotFound Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"status\": 404,\n   \"message\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"message\": \"field username must be exist\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });

// -----------------------
// Headers
// -----------------------

/**
 * @apiDefine AuthorizationHeader
 *
 * @apiHeader {Object} Authorization header value must follow the pattern
 * "Bearer [token sting]"
 *
 * @apiHeaderExample {json} Authorization Header Example:
 *    {
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
 *    }
 *
 */

// -----------------------
// Error Responses
// -----------------------

/**
 * @apiDefine NotAuthorizedError
 *
 * @apiError Unauthorized The JWT is missing or not valid.
 *
 * @apiErrorExample Unauthorized Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "status": 401,
 *        "message": "No authorization token was found"
 *     }
 */

/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFound When (item || route) not exists.
 *
 * @apiErrorExample NotFound Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "status": 404,
 *        "message": "User not found"
 *     }
 */

/**
 * @apiDefine ConflictError
 *
 * @apiError Conflict When item must be unique and similar item already exists
 *
 * @apiErrorExample Conflict Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *        "status": 409,
 *        "message": "User already exist"
 *     }
 */

/**
 * @apiDefine InternalServerError
 *
 * @apiError InternalError There was an internal error when trying to serve the request
 *
 * @apiErrorExample InternalError Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "status": 500,
 *       "message": "There was an internal error when trying to serve the request"
 *     }
 */

/**
 * @apiDefine BadRequestError
 *
 * @apiError BadRequest When trying to serve the request with incorrect data
 *
 * @apiErrorExample BadRequest Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400,
 *       "message": "field username must be exist"
 *     }
 */

// -----------------------
// Success Responses
// -----------------------

/**
 * @apiDefine NoContentResponse
 * @apiDescription Empty successful response
 *
 * @apiSuccessExample NoContent Response:
 *    HTTP/1.1 204 No Content
 */
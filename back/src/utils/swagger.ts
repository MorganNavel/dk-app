import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Définir les options pour swagger-jsdoc
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version: "1.0.0",
      description:
        "A sample API to demonstrate reusable responses and schemas.",
    },
    components: {
      schemas: {
        ApiResponse: {
          type: "object",
          required: ["code"],
          properties: {
            code: {
              type: "integer",
              description: "The HTTP response code",
            },
            data: {
              type: "object",
              description: "Optional response data",
            },
            error: {
              type: "object",
              description: "Optional error details",
            },
          },
        },
        SignUpInput: {
          type: "object",
          required: [
            "firstname",
            "name",
            "email",
            "password",
            "confirmPassword",
          ],
          properties: {
            firstname: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
            confirmPassword: {
              type: "string",
            },
            nationality: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["French", "English"],
            },
            languages: {
              type: "object",
              additionalProperties: {
                type: "string",
              },
              example: {
                LinkedIn: "https://www.linkedin.com/in/johndoe",
                Instagram: "https://www.instagram.com/johndoe",
              },
            },
            description: {
              type: "string",
              example: "I am a language lover",
            },
          },
        },
        SignInInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                code: 200,
                data: {},
              },
            },
          },
        },
        201: {
          description: "Resource created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                code: 201,
                data: {},
              },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                code: 400,
                error: {
                  message: "Invalid input",
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                code: 401,
                error: {
                  message: "Authentication required",
                },
              },
            },
          },
        },
        404: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                code: 404,
                error: {
                  message: "Resource not found",
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                code: 500,
                error: {
                  message: "Unexpected error occurred",
                },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3001/api/v1",
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "../feat/**/schemes.ts"),
    path.resolve(__dirname, "../feat/**/*Router.ts"),
    path.resolve(__dirname, "../feat/**/schemes.js"),
    path.resolve(__dirname, "../feat/**/*Router.js"),
  ],
};

const specs = swaggerJsdoc(options);

function swagger(app: Express, port: number = 3001) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

  app.get("/swagger.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log(`Swagger is running on http://localhost:${port}/swagger`);
}

export default swagger;

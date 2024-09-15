import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const PORT = parseInt(process.env.API_PORT || "3001");

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
      parameters: {
        idLessonType: {
          type: "string",
          in: "path",
          required: true,
          name: "idLesson",
          description: "The ID of the lesson",
        },
        idUserType: {
          type: "string",
          in: "path",
          required: true,
          name: "idUser",
          description: "The ID of the user",
        },
        idBookType: {
          type: "string",
          in: "path",
          required: true,
          name: "idBooking",
          description: "The ID of the book",
        },
        idPricingType: {
          type: "string",
          in: "path",
          required: true,
          name: "idPricing",
          description: "The ID of the pricing",
        },
      },
    },
    servers: [
      {
        url: `http://192.168.1.27:${PORT}/api/v1`,
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

function swagger(app: Express, addresses: string[], port: number = 3001) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

  app.get("/swagger.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
  for (const address of addresses)
    console.log(`Swagger is running on http://${address}:${port}/swagger`);
}

export default swagger;

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Timebox Evo API',
    description: 'Timebox Evo management API',
    contact: {
      name: 'Christian Panadero',
      url: 'https://www.panavtec.me/'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local'
    }
  ],
  tags: [{name: 'Management endpoints'}],
  paths: {
    '/text': {
      post: {
        tags: [ 'Management endpoints'],
        description: 'Sends text to device',
        operationId: 'sendText',
        parameters: [
          {
            name: 'text',
              in: 'body',
            schema: {
              type: 'string'
            },
            required: true
          }
        ],
        responses: {
          '200': {
            description: 'Text is sent to device',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/OkResponse'
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NOkResponse'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      OkResponse: {
        type: 'object',
        properties: {
          text: { type: 'string' },
        }
      },
      NOkResponse: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          err: { type: 'string' },
        }
      }
    }
  }
}

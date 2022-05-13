const ClientError = require('../../exceptions/ClientError');

class UploadsHandler {
  #service;

  #validator;

  constructor(service, validator) {
    this.#service = service;
    this.#validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    try {
      const { data } = request.payload;
      console.log(data.hapi);
      this.#validator.validateImageHeaders(data.hapi.headers);

      const fileLocation = await this.#service.writeFile(data, data.hapi);
      // const filename = await this.#service.writeFile(data, data.hapi);

      // without aws-sdk
      // const response = h.response({
      //   status: 'success',
      //   data: {
      //     fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
      //   },
      // });

      // with aws-sdk
      const response = h.response({
        status: 'success',
        data: {
          fileLocation,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UploadsHandler;

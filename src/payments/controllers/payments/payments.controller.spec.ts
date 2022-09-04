import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  const requestMock = {
    query: {}
  } as unknown as Request;

  const statusResMock = {
    send: jest.fn(x => x)
  }

  const responseMock = {
    status: jest.fn(x => statusResMock),
    send: jest.fn(x => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    controller.getPayments
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("getPayments", () => {
    it("should return a status of 400", () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400)
      expect(statusResMock.send).toHaveBeenCalledWith({
        msg: "Error"
      })
    })

    it("should return a status of 200 when query params are present", () => {
      requestMock.query = {
        count: "10",
        page: "12"
      }
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200)
    })
  })
});

import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

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
      providers: [
        {
          provide: "PAYMENTS_SERVICE",
          useValue: {
            createPayment: jest.fn(x => x)
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>("PAYMENTS_SERVICE")
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("paymentsService should be defined", () => {
    expect(paymentsService).toBeDefined();
  })

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

  describe("createPayment", () => {
    it("should throw an error", async () => {
      jest.spyOn(paymentsService, "createPayment")
      .mockImplementation(() => {
        throw new BadRequestException();
      })
      try {
        const response = await controller.createPayment({
          email: "aravind1@gmail.com",
          price: 100
        })
      } catch(e) {
        console.log(e)
      }
    })
  })
});

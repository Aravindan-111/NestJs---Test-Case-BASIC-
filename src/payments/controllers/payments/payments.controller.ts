import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

/**
    IMPORTING LIKE THIS MAY CAUSE ERROR SOME TIMES

    import { PaymentsService } from 'src/payments/services/payments/payments.service';
    import { CreatePaymentDto } from 'src/payments/dto/CreatePaymentDto';
*/

import { PaymentsService } from '../../../payments/services/payments/payments.service';
import { CreatePaymentDto } from '../../dto/CreatePaymentDto';



@Controller('payments')

export class PaymentsController {
    constructor(
        @Inject("PAYMENTS_SERVICE")
        public paymentsService: PaymentsService
    ) {}
    @Get()
    getPayments(@Req() request: Request, @Res() response: Response) {
        const { count, page } = request.query;

        if(!count || !page) {
            response
                .status(400)
                .send({ msg: "Error" })
        } else {
            response.status(200);
        }
    }

    @Post("create")    
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        const res = await this.paymentsService.createPayment(createPaymentDto);
        return res;
    }
}

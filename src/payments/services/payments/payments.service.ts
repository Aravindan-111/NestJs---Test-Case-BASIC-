import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/CreatePaymentDto';

@Injectable()
export class PaymentsService {

    private users = [
        {
            email: "aravind1@gmail.com"
        },
        {
            email: "aravind2@gmail.com"
        },
        {
            email: "aravind3@gmail.com"
        }
    ]

    async createPayment(createPaymentDto: CreatePaymentDto) {
        const { email } =  createPaymentDto;
        const user = this.users.find((user) => user.email === email)

        if(user)
        return {
            id: 1,
            status: "success"
        } 
        else {
            throw new BadRequestException();
        }
    }
}

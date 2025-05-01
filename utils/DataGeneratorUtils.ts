import {faker} from '@faker-js/faker'


export class DataGenerator{

    static generateUser(){

        return {
            userName: faker.string.alpha({length: 7}),
            userEmail: faker.internet.email(),
            userPassword: faker.internet.password({length: 10}),
            empFirstName: faker.person.firstName(),
            empLastName: faker.person.lastName(),
            empMiddleName: faker.person.middleName(),
            empId: faker.number.int(10000),


        };

    }
}


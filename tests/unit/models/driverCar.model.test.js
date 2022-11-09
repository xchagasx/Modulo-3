const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const { driverCarModel } = require('../../../src/models');
const { driverCarMock } = require('./mocks/driverCar.model.mock');

describe('Testes de unidade do model entre motoristas e os carros', function () {
    describe('Cadastra o relacionamento das pessoas motoristas com os carros', function () {
        
        before(async function () {
            const execute = { insertId: 1 };
            sinon.stub(connection, 'execute').resolves([execute]);
        });

        after(async function () {
            connection.execute.restore();
        });
        
        it('com sucesso', async function () {
            const payload = {
                driverId: 3,
                carId: 1,
            };
            
            const response = await driverCarModel.insert(payload);

            expect(response).to.equal(driverCarMock);
        });
    })
});
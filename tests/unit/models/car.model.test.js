const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/db/connection');
const { carModel } = require('../../../src/models');
const { carMock, carMockId } = require('./mocks/car.model.mock');

describe('Testes de unidade do model de carros', function () {
    afterEach(sinon.restore);

    it('Cadastrando um carro', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await carModel.insert(carMock);
    expect(result).to.equal(1);
    });

    it('Recuperando um carro a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[carMockId[0]]]);
    const result = await carModel.findById(2);
    expect(result).to.be.deep.equal(carMockId[0]);
    });
});

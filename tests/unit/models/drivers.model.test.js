const { expect } = require('chai');
const sinon = require('sinon');
const { driverModel } = require('../../../src/models');

const connection = require('../../../src/models/db/connection');
const { driversMock, driverMockId, newDriver } = require('./mocks/drivers.model.mock');

describe('Testes de unidade do model de pessoas motoristas', function () {
    afterEach(sinon.restore);

    it('Recuperando a lista de pessoas motoristas', async function () {
    sinon.stub(connection, 'execute').resolves([driversMock]);
    const result = await driverModel.findAll();
    expect(result).to.be.deep.equal(driversMock);
    });

    it('Recuperando uma pessoa motorista a partir do seu id', async function () {
        sinon.stub(connection, 'execute').resolves([[driverMockId[0]]]);
        const result = await driverModel.findById(1);
        expect(result).to.be.deep.equal(driverMockId[0]);
    });

    it('Cadastrando uma pessoa motorista', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
        const result = await driverModel.insert(newDriver);
        expect(result).to.equal(1);
    });
});


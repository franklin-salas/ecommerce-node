const ClientRepository = require('../../domain/repositories/ClientRepository');
const ClientModel = require('../database/models/Client');
const Client = require('../../domain/entities/Client');

class MongoClientRepository extends ClientRepository {
  async getAll() {
    const clients = await ClientModel.find();
    return clients.map(c => new Client(c.toObject()));
  }

  async getById(id) {
    const client = await ClientModel.findById(id);
    return client ? new Client(client.toObject()) : null;
  }

  async create(client) {
    const newClient = await ClientModel.create(client);
    return new Client(newClient.toObject());
  }

  async update(id, clientData) {
    const updated = await ClientModel.findByIdAndUpdate(id, clientData, { new: true });
    return updated ? new Client(updated.toObject()) : null;
  }

  async delete(id) {
    await ClientModel.findByIdAndDelete(id);
  }
}

module.exports = MongoClientRepository;

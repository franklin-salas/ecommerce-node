const CreateClient = require('../../application/use_cases/CreateClient');
const ClientDTO = require('../../application/dtos/ClientDTO');

class ClientController {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
    this.createClient = new CreateClient(clientRepository);
  }

  async create(req, res) {
    try {
      const client = await this.createClient.execute(req.body);
      res.status(201).json(new ClientDTO(client));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const clients = await this.clientRepository.getAll();
      res.status(200).json(clients.map(c => new ClientDTO(c)));
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving clients' });
    }
  }
}

module.exports = ClientController;

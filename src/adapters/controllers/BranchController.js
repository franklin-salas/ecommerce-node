const CreateBranch = require('../../application/use_cases/CreateBranch');
const BranchDTO = require('../../application/dtos/BranchDTO');

class BranchController {
  constructor(branchRepository) {
    this.branchRepository = branchRepository;
    this.createBranch = new CreateBranch(branchRepository);
  }

  async create(req, res) {
    try {
      const branch = await this.createBranch.execute(req.body);
      res.status(201).json(new BranchDTO(branch));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const branches = await this.branchRepository.getAll();
      res.status(200).json(branches.map(b => new BranchDTO(b)));
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving branches' });
    }
  }
}

module.exports = BranchController;

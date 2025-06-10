const Branch = require('../../domain/entities/Branch');

class CreateBranch {
  constructor(branchRepository) {
    this.branchRepository = branchRepository;
  }

  async execute(branchData) {
    const branch = new Branch(branchData);
    return await this.branchRepository.create(branch);
  }
}

module.exports = CreateBranch;

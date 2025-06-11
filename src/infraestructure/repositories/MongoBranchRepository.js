const BranchRepository = require('../../domain/repositories/BranchRepository');
const BranchModel = require('../database/models/BranchModel');
const Branch = require('../../domain/entities/Branch');

class MongoBranchRepository extends BranchRepository {
  async getAll() {
    const branches = await BranchModel.find();
    return branches.map(b => new Branch(b.toObject()));
  }

  async getById(id) {
    const branch = await BranchModel.findById(id);
    return branch ? new Branch(branch.toObject()) : null;
  }

  async create(branch) {
    const newBranch = await BranchModel.create(branch);
    return new Branch(newBranch.toObject());
  }

  async update(id, branchData) {
    const updated = await BranchModel.findByIdAndUpdate(id, branchData, { new: true });
    return updated ? new Branch(updated.toObject()) : null;
  }

  async delete(id) {
    await BranchModel.findByIdAndDelete(id);
  }
}

module.exports = MongoBranchRepository;

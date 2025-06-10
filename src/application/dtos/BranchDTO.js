class BranchDTO {
    constructor({ id, name, location, manager, phone }) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.manager = manager;
      this.phone = phone;
    }
  }
  
  module.exports = BranchDTO;
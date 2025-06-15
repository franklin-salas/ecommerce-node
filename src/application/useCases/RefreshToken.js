class RefreshToken {
    constructor(tokenGenerator) {
      this.tokenGenerator = tokenGenerator;
    }
  
    async execute({ userId, userRoles }) {
      const newAccessToken = this.tokenGenerator.generate(
        { id: userId, roles: userRoles },
        { expiresIn: '15m' }
      );
  
      return { accessToken: newAccessToken };
    }
  }
  
  module.exports = RefreshToken;
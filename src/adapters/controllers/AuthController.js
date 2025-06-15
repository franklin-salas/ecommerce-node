class AuthController {
    constructor(signInUseCase,refreshTokenUseCase) {
      this.refreshTokenUseCase = refreshTokenUseCase;
      this.signInUseCase = signInUseCase;
    }
   
    async signIn(req, res, next) {
      try {
        const { username, password } = req.body;
        const { user, token } = await this.signInUseCase.execute({ username, password });
        delete user.password;
        res.json({ user, token });
      } catch (err) {
        res.status(401).json({ message: err.message });
      }
    }
    async refreshToken(req, res, next) {
      try {
        const { userId, userRoles } = req;
        const { accessToken } = await this.refreshTokenUseCase.execute({ userId, userRoles });
        res.json({ accessToken });
      } catch (err) {
        res.status(401).json({ message: err.message });
      }
    }
  }
   
  module.exports = AuthController;
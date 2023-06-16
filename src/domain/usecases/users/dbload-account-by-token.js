export class DbLoadAccountByToken {
  constructor(DbLoadAccountByTokenRepository, decryper) {
    this.DbLoadAccountByTokenRepository = DbLoadAccountByTokenRepository;
    this.decryper = decryper;
  }

  async loadUser(accessToken) {
    let token;
    try {
      if (accessToken) {
        token = await this.decryper.decrypt(accessToken);
      }
    } catch (error) {
      return null;
    }
    if (token) {
      const user = await this.DbLoadAccountByTokenRepository.load(accessToken);
      if (user) {
        return user;
      }
    }
    return null;
  }
}

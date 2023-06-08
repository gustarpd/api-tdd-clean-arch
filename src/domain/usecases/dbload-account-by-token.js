export class DbLoadAccountByToken {
  constructor(DbLoadAccountByTokenRepository, decryper) {
    this.DbLoadAccountByTokenRepository = DbLoadAccountByTokenRepository;
    this.decryper = decryper;
  }

  async loadUser(accessToken) {
    try {
      if (accessToken) {
        const decryper = await this.decryper.decrypt(accessToken);
        return decryper;
      }
    } catch (error) {
      return null;
    }
    if (accessToken) {
      const user = await this.DbLoadAccountByTokenRepository.load(accessToken);
      if (user) {
        return user;
      }
    }
    return null;
  }
}

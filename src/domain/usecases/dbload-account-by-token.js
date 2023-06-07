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

    const load = await this.DbLoadAccountByTokenRepository.load(accessToken);

    if (load) {
      return load;
    }

    return null;
  }
}

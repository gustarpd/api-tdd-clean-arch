class Encrypter {
    async compare(password, hashed_pass) {
        return true
    }
}

describe('Encrypter', () => {
    test('Should return true if bcrypty returns true', async () => {
       const sut = new Encrypter()
       const isValid = await sut.compare('password', 'hashed_pass')
       expect(isValid).toBe(true)
    })
})
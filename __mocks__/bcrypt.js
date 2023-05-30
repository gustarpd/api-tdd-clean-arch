export default {
  isValid: true,
  value: '',
  hashed_value: '',
  async compare(value, hashed) {
    this.value = value
    this.hashed_value = hashed
    return this.isValid;
  },
};

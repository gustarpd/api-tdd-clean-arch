export function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); 

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let digit;
  const cpfDigits = cpf.split('').map(Number);


  for (let i = 0; i < 9; i++) {
    sum += cpfDigits[i] * (10 - i);
  }
  digit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  if (cpfDigits[9] !== digit) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpfDigits[i] * (11 - i);
  }
  digit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  if (cpfDigits[10] !== digit) {
    return false;
  }

  return true; 
}
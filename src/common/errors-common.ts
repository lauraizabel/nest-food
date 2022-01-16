export const DefaultErrors = {
  isEmpty: (field: string) => `Informe um ${field}`,
  invalid: (field: string) => `Informe um ${field} válido`,
  minLength: (field: string, length: string | number) =>
    `${field} deve conter pelo menos ${length} caracteres.`,
  maxLength: (field: string, length: string | number) =>
    `${field} deve conter menos de ${length} caracteres.`,
  notMatch: () => 'Os valores não conferem.',
};

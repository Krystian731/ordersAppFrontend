export const errorsUser:{[key: string]: string} = {
  required: 'Nazwa użytkownika nie może być pusta!',
  minlength: 'Nazwa użytkownika musi zawierać conajmniej 4 znaki',
  userNotExists: 'Złe dane logowania',
  maxlength: 'Nazwa użytkownika nie może być dłuższa niż 20 znaków',
  usernameTaken: 'Użytkownik jest już zarejestrowany'
}

export const errorsOrder:{[key: string]: string} = {
  required: 'Nazwa zamównia nie może być pusta!',
  minlength: 'Nazwa zamównienia musi zawierać conajmniej 4 znaki',
  maxlength: 'Nazwa zamównienia nie może być dłuższa niż 20 znaków',
}

export const errorsPassword:{[key: string]: string} = {
  required: 'Hasło nie może być puste!',
  minlength: 'Hasło musi zawierać conajmniej 4 znaki',
  maxlength: 'Hasło nie może być dłuższe niż 20 znaków',
  invalidData: 'błędne dane logowania!'
}

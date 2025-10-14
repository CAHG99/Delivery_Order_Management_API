const bcrypt = require('bcrypt');

const storedHash = "$2b$10$$2b$10$fdKXz8ucB7jk6DuN5NFpceHxwiQW0fbbhLJ4KskKbSGGPRy7vHoQy"; // El hash guardado en la DB
const inputPassword = "mypassword123"; // La contraseña ingresada por el usuario

export const comparePassword = async (inputPassword: string, storedHash: string): Promise<boolean> => {
  try {
    // Comparar la contraseña ingresada con el hash almacenado
    const isValid = await bcrypt.compare(inputPassword, storedHash); 
    console.log('¿La contraseña es válida?', isValid);
    return isValid;
  } catch (error) {
    throw new Error(`Error al comparar las contraseñas: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
};

// Test para ver si la función funciona
comparePassword(inputPassword, storedHash)
  .then(isValid => {
    if (isValid) {
      console.log('La contraseña es válida.');
    } else {
      console.log('La contraseña no es válida.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });



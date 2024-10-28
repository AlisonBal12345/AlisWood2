// Función para cargar y mostrar los productos en la página principal
function loadProducts() {
  const productList = document.getElementById('product-list');
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Limpiar el contenedor de productos
  productList.innerHTML = '';

  // Crear las tarjetas de productos
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <h3>${product.category}</h3>
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <p>Cantidad disponible: ${product.quantity}</p>
      ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
      <button class="add-to-cart-btn" ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">Agregar al carrito</button>
    `;

    productList.appendChild(productCard);
  });

  // Agregar eventos a los botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productIndex = this.getAttribute('data-index');
      const selectedProduct = products[productIndex];
      agregarAlCarrito(selectedProduct);
    });
  });
}
// Cargar los productos cuando se cargue la página principal
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('hamburger-btn').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active'); // Activa o desactiva la clase "active" para mostrar/ocultar el menú
  });

  // Llama a la función de actualización de navegación aquí
  updateNav();
});

// Función para verificar si hay un usuario logueado y actualizar la navegación
function updateNav() {
   const loggedInUser = localStorage.getItem('loggedInUser');
   const loginLink = document.getElementById('login-link');
   const registerLink = document.getElementById('register-link');
   const logoutLink = document.getElementById('logout-link');
   const historialLink = document.getElementById('historial-link');
   const welcomeMessage = document.getElementById('welcome-message');
 
   if (loggedInUser) {
     // Si hay un usuario logueado
     loginLink.style.display = 'none';  // Ocultar el botón de login
     registerLink.style.display = 'none';  // Ocultar el botón de registro
     historialLink.style.display = 'inline';
     welcomeMessage.style.display = 'inline';  // Mostrar mensaje de bienvenida
     welcomeMessage.textContent = `Bienvenido, ${loggedInUser}`;  // Mostrar nombre del usuario
     logoutLink.style.display = 'inline';  // Mostrar botón de cerrar sesión
   } else {
     // Si no hay usuario logueado
     loginLink.style.display = 'inline';  // Mostrar el botón de login
     registerLink.style.display = 'inline';  // Mostrar el botón de registro
     welcomeMessage.style.display = 'none';  // Ocultar el mensaje de bienvenida
     logoutLink.style.display = 'none';  // Ocultar el botón de cerrar sesión
   }
 }
 
 // Función para cerrar sesión
 function logoutUser() {
   localStorage.removeItem('loggedInUser');  // Eliminar usuario logueado de localStorage
   alert('Has cerrado sesión exitosamente.');
   updateNav();  // Actualizar la barra de navegación
   window.location.href = '/index.html';  // Redirigir a la página principal
 }
 
 // Evento para gestionar el cierre de sesión
 document.addEventListener('DOMContentLoaded', function() {
   updateNav();  // Llamar a la función para actualizar la navegación cuando la página cargue
 
   const logoutLink = document.getElementById('logout-link');
   if (logoutLink) {
     logoutLink.addEventListener('click', logoutUser);
   }
 });





// Función para agregar productos
function addProduct(event) {
  event.preventDefault();

  const category = document.getElementById('product-category').value;
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const description = document.getElementById('product-description').value;
  const quantity = document.getElementById('product-quantity').value;
  const imageFile = document.getElementById('product-image').files[0];

  // Verificar que se haya ingresado todo
  if (!category ||!name || !price || !description || !quantity || !imageFile) {
    alert('Por favor, ingrese todos los campos');
    return;
  }

  // Convertir la imagen en base64 para guardarla
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageDataUrl = event.target.result;

    // Recuperar los productos de localStorage (o un arreglo vacío si no hay productos)
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Crear el nuevo producto
    const newProduct = {
     category,
      name,
      price,
      description,
      quantity,
      image: imageDataUrl,  // Guardar la imagen en base64
    };

    // Agregar el producto al arreglo y guardar en localStorage
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    alert('Producto agregado exitosamente');
    document.getElementById('add-product-form').reset();  // Limpiar el formulario
  };

  reader.readAsDataURL(imageFile);  // Leer la imagen como base64
}

// Agregar el evento al formulario de productos
document.addEventListener('DOMContentLoaded', function() {
  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
  }
});


// Al cargar la página de administrador, verificamos si es el admin
function checkAdminAccess() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Verificar si el usuario está logueado y si es admin
  if (!loggedInUser || loggedInUser !== 'admin') {
    alert('Acceso denegado. Solo el administrador puede acceder a esta página.');
    window.location.href = '../index.html';  // Redirigir al index si no es admin
  }
}

// Agregar los event listeners en los formularios
document.addEventListener('DOMContentLoaded', function() {
  // Si estamos en la página de administración, verificamos el acceso
  if (window.location.pathname.includes('/HTML/admin.html')) {
    checkAdminAccess();
  }
});

// Función para mostrar los productos en la página
function displayProducts() {
 const productList = document.getElementById('product-list');
 productList.innerHTML = ''; // Limpiar el contenido anterior

 let products = JSON.parse(localStorage.getItem('products')) || [];

 if (products.length === 0) {
   productList.innerHTML = '<p>No hay productos disponibles.</p>';
   return;
 }

 products.forEach((product, index) => {
   const productDiv = document.createElement('div');
   productDiv.classList.add('product-item');
   
   productDiv.innerHTML = `
     <h2>${product.category}</h2>
     <h3>${product.name}</h3>
     <p>Precio: $${product.price}</p>
     <p>Descripción: ${product.description}</p>
     <p>Cantidad: ${product.quantity}</p>
     <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
     <button onclick="editProduct(${index})">Editar</button>
     <button onclick="deleteProduct(${index})">Eliminar</button>
   `;

   productList.appendChild(productDiv);
 });
}

// Llamar a la función para mostrar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
 displayProducts();
});

// Función para eliminar un producto
function deleteProduct(index) {
 let products = JSON.parse(localStorage.getItem('products')) || [];
 
 // Eliminar el producto del array
 products.splice(index, 1);
 
 // Guardar el nuevo array en localStorage
 localStorage.setItem('products', JSON.stringify(products));

 // Actualizar la lista de productos en pantalla
 displayProducts();
 
 alert('Producto eliminado correctamente.');
}

// Función para editar un producto
function editProduct(index) {
 let products = JSON.parse(localStorage.getItem('products')) || [];

 // Cargar la información del producto en el formulario
 const product = products[index];
 document.getElementById('product-category').value = product.category;
 document.getElementById('product-name').value = product.name;
 document.getElementById('product-price').value = product.price;
 document.getElementById('product-description').value = product.description;
 document.getElementById('product-quantity').value = product.quantity;

 // Cambiar el comportamiento del botón de agregar a actualizar
 const form = document.getElementById('add-product-form');
 const submitButton = form.querySelector('button[type="submit"]');
 submitButton.textContent = 'Actualizar Producto';

 // Quitar el evento anterior
 form.removeEventListener('submit', addProduct);

 // Añadir un nuevo evento para actualizar el producto
 form.addEventListener('submit', function updateProduct(event) {
   event.preventDefault();

   const updatedProduct = {
     category: document.getElementById('product-category').value,
     name: document.getElementById('product-name').value,
     price: document.getElementById('product-price').value,
     description: document.getElementById('product-description').value,
     quantity: document.getElementById('product-quantity').value,
     image: product.image // Mantener la imagen previa
   };

   // Actualizar el producto en el array
   products[index] = updatedProduct;
   localStorage.setItem('products', JSON.stringify(products));

   alert('Producto actualizado correctamente.');
   submitButton.textContent = 'Agregar Producto';

   // Limpiar el formulario
   form.reset();

   // Restaurar el comportamiento original del formulario
   form.removeEventListener('submit', updateProduct);
   form.addEventListener('submit', addProduct);

   // Actualizar la lista de productos en pantalla
   displayProducts();
 });
}

// Función para mostrar los productos en la página como tarjetas
function displayProducts() {
 const productList = document.getElementById('product-list');
 productList.innerHTML = ''; // Limpiar el contenido anterior

 let products = JSON.parse(localStorage.getItem('products')) || [];

 if (products.length === 0) {
   productList.innerHTML = '<p>No hay productos disponibles.</p>';
   return;
 }

 products.forEach((product, index) => {
   const productDiv = document.createElement('div');
   productDiv.classList.add('product-item');
   
   productDiv.innerHTML = `
     <h2>${product.category}</h2>
     <img src="${product.image}" alt="${product.name}">
     <h3>${product.name}</h3>
     <p>Precio: $${product.price}</p>
     <p>Cantidad: ${product.quantity}</p>
     <p>${product.description}</p>
     <button onclick="editProduct(${index})">Editar</button>
     <button onclick="deleteProduct(${index})">Eliminar</button>
   `;

   productList.appendChild(productDiv);
 });
}

// Llamar a la función para mostrar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
 displayProducts();
});


document.getElementById('hamburger-btn').addEventListener('click', function() {
 const navbar = document.getElementById('navbar');
 navbar.classList.toggle('active'); // Activa o desactiva la clase "active" para mostrar/ocultar el menú
});

// Cargar usuarios del localStorage y mostrarlos en la página
function loadUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';

  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.username} 
      <button class="edit-btn" data-index="${index}">Editar</button>
      <button class="delete-btn" data-index="${index}">Eliminar</button>
    `;
    userList.appendChild(li);
  });
}

// Guardar o modificar un usuario
function saveUser(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const existingUserIndex = users.findIndex(user => user.username === username);

  if (existingUserIndex !== -1) {
    // Modificar usuario existente
    users[existingUserIndex].password = password;
    alert('Usuario modificado exitosamente');
  } else {
    // Crear nuevo usuario
    users.push({ username, password });
    alert('Usuario creado exitosamente');
  }

  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('user-form').reset();
  loadUsers(); // Recargar la lista de usuarios
}

// Eliminar un usuario
function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.splice(index, 1); // Eliminar el usuario por su índice
  localStorage.setItem('users', JSON.stringify(users));
  loadUsers(); // Recargar la lista de usuarios
}

// Editar usuario (cargarlo en el formulario)
function editUser(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users[index];

  document.getElementById('username').value = user.username;
  document.getElementById('password').value = user.password;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  loadUsers(); // Cargar y mostrar la lista de usuarios al cargar la página

  const userForm = document.getElementById('user-form');
  userForm.addEventListener('submit', saveUser); // Guardar o modificar usuarios

  // Delegar eventos de edición y eliminación
  document.getElementById('user-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
      const index = event.target.getAttribute('data-index');
      editUser(index); // Cargar datos del usuario en el formulario
    }

    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.getAttribute('data-index');
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        deleteUser(index); // Eliminar usuario
      }
    }
  });
});
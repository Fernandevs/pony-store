import * as bcrypt from 'bcrypt';

interface SeedFoodItem {
  name: string;
  description: string;
  price: number;
  category: 'Bebida' | 'Comida' | 'Desayuno' | 'Postre';
  images: string[];
}

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
  products: SeedFoodItem[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@gmail.com',
      fullName: 'Test One',
      password: bcrypt.hashSync('Abcd1234', 10),
      roles: ['admin']
    },
    {
      email: 'test2@gmail.com',
      fullName: 'Test Two',
      password: bcrypt.hashSync('Abcd1234', 10),
      roles: ['user']
    }
  ],
  products: [
    {
      name: 'Chilaquiles Verdes',
      description: 'Chilaquiles con salsa verde, crema, queso y cebolla.',
      price: 89.99,
      category: 'Desayuno',
      images: ['chilaquiles-verdes.jpg'],
    },
    {
      name: 'Huevos Rancheros',
      description: 'Huevos estrellados sobre tortillas de maíz, bañados con salsa ranchera.',
      price: 79.99,
      category: 'Desayuno',
      images: ['huevos-rancheros.jpg'],
    },
    {
      name: 'Molletes',
      description: 'Pan francés cubierto con frijoles refritos, queso gratinado y salsa pico de gallo.',
      price: 69.99,
      category: 'Desayuno',
      images: ['molletes.jpg'],
    },
    {
      name: 'Enchiladas Suizas',
      description: 'Tortillas rellenas de pollo, bañadas en salsa verde, cubiertas con queso gratinado y crema.',
      price: 99.99,
      category: 'Comida',
      images: ['enchiladas-suizas.jpg'],
    },
    {
      name: 'Hotcakes',
      description: 'Tres hotcakes esponjosos servidos con miel de maple y mantequilla.',
      price: 59.99,
      category: 'Desayuno',
      images: ['hotcakes.jpg'],
    },
    {
      name: 'Churros',
      description: 'Churros crujientes rellenos de chocolate',
      price: 49.99,
      category: 'Postre',
      images: ['churros.jpg'],
    },
    {
      name: 'Burrito de Desayuno',
      description: 'Burrito relleno de huevos revueltos, frijoles refritos y queso.',
      price: 79.99,
      category: 'Desayuno',
      images: ['burrito-de-desayuno.jpg'],
    },
    {
      name: 'Omelette de Jamón y Queso',
      description: 'Omelette esponjoso relleno de jamón y queso derretido.',
      price: 89.99,
      category: 'Desayuno',
      images: ['omelette-de-jamón-y-queso.jpg'],
    },
    {
      name: 'Pan Francés',
      description: 'Rebanadas de pan empapadas en una mezcla de huevo y leche, doradas a la perfección y servidas con miel de maple.',
      price: 69.99,
      category: 'Desayuno',
      images: ['pan-francés.jpg'],
    },
    {
      name: 'Huevos a la Mexicana',
      description: 'Huevos revueltos con tomate, cebolla y chile verde, servidos con frijoles refritos y tortillas de maíz.',
      price: 79.99,
      category: 'Desayuno',
      images: ['huevos-a-la-mexicana.jpg'],
    },
    {
      name: 'Tacos de Chorizo',
      description: 'Tacos de chorizo con huevo, servidos con salsa verde.',
      price: 89.99,
      category: 'Comida',
      images: ['tacos-de-chorizo.jpg'],
    },
    {
      name: 'Quesadillas de Flor de Calabaza',
      description: 'Quesadillas rellenas de flor de calabaza y queso, servidas con salsa verde.',
      price: 79.99,
      category: 'Comida',
      images: ['quesadillas-de-flor-de-calabaza.jpg'],
    },
    {
      name: 'Enfrijoladas',
      description: 'Tortillas bañadas en salsa de frijol, rellenas de queso y cebolla, servidas con crema.',
      price: 69.99,
      category: 'Comida',
      images: ['enfrijoladas.jpg'],
    },
    {
      name: 'Chiles Rellenos',
      description: 'Chiles poblanos rellenos de queso, bañados en salsa de tomate, servidos con frijoles refritos.',
      price: 99.99,
      category: 'Comida',
      images: ['chiles-rellenos.jpg'],
    },
    {
      name: 'Tamal Oaxaqueño',
      description: 'Tamal de masa de maíz relleno de pollo en salsa verde, envuelto en hoja de plátano.',
      price: 59.99,
      category: 'Comida',
      images: ['tamal-oaxaqueño.jpg'],
    },
    {
      name: 'Tacos de Carnitas',
      description: 'Tacos de carnitas servidos con cilantro, cebolla y salsa verde.',
      price: 99.99,
      category: 'Comida',
      images: ['tacos-de-carnitas.jpg'],
    },
    {
      name: 'Pozole Rojo',
      description: 'Pozole rojo con carne de cerdo, servido con lechuga, rábano, orégano y limón.',
      price: 129.99,
      category: 'Comida',
      images: ['pozole-rojo.jpg'],
    },
    {
      name: 'Chiles en Nogada',
      description: 'Chiles poblanos rellenos de picadillo, cubiertos con salsa de nuez, perejil y granada.',
      price: 149.99,
      category: 'Comida',
      images: ['chiles-en-nogada.jpg'],
    },
    {
      name: 'Mole Poblano',
      description: 'Pollo en mole poblano, servido con arroz y tortillas.',
      price: 139.99,
      category: 'Comida',
      images: ['mole-poblano.jpg'],
    },
    {
      name: 'Café Americano',
      description: 'Café recién hecho, servido caliente.',
      price: 39.99,
      category: 'Bebida',
      images: ['café-americano.jpg'],
    },
    {
      name: 'Jugo de Naranja',
      description: 'Jugo de naranja recién exprimido, lleno de vitamina C.',
      price: 49.99,
      category: 'Bebida',
      images: ['jugo-de-naranja.jpg'],
    },
    {
      name: 'Agua de Jamaica',
      description: 'Refrescante agua de jamaica, servida fría.',
      price: 29.99,
      category: 'Bebida',
      images: ['agua-de-jamaica.jpg'],
    },
    {
      name: 'Licuado de Plátano',
      description: 'Licuado de plátano con leche, servido frío.',
      price: 59.99,
      category: 'Bebida',
      images: ['licuado-de-plátano.jpg'],
    },
    {
      name: 'Té Verde',
      description: 'Té verde caliente, lleno de antioxidantes.',
      price: 39.99,
      category: 'Bebida',
      images: ['té-verde.jpg'],
    },
    {
      name: 'Chocolate Caliente',
      description: 'Chocolate caliente, servido con un toque de canela.',
      price: 49.99,
      category: 'Bebida',
      images: ['chocolate-caliente.jpg'],
    },
    {
      name: 'Frappe de Moka',
      description: 'Frappe de moka, servido con crema batida y salsa de chocolate.',
      price: 69.99,
      category: 'Bebida',
      images: ['frappé-de-moka.jpg'],
    },
    {
      name: 'Agua de Horchata',
      description: 'Refrescante agua de horchata, servida fría.',
      price: 39.99,
      category: 'Bebida',
      images: ['agua-de-horchata.jpg'],
    },
    {
      name: 'Smoothie de Fresa',
      description: 'Smoothie de fresa, servido frío con un toque de miel.',
      price: 59.99,
      category: 'Bebida',
      images: ['smoothie-de-fresa.jpg'],
    },
    {
      name: 'Espresso Doble',
      description: 'Espresso doble, servido caliente.',
      price: 49.99,
      category: 'Bebida',
      images: ['espresso-doble.jpg'],
    },
    {
      name: 'Pastel de Chocolate',
      description: 'Pastel de chocolate suave y esponjoso, servido con crema batida.',
      price: 59.99,
      category: 'Postre',
      images: ['pastel-de-chocolate.jpg'],
    },
    {
      name: 'Flan Napolitano',
      description: 'Flan Napolitano cremoso, servido con caramelo líquido.',
      price: 49.99,
      category: 'Postre',
      images: ['flan-napolitano.jpg'],
    },
    {
      name: 'Tiramisú',
      description: 'Tiramisú con capas de bizcocho empapado en café, queso mascarpone y cacao en polvo.',
      price: 69.99,
      category: 'Postre',
      images: ['tiramisú.jpg'],
    },
    {
      name: 'Cheesecake de Fresa',
      description: 'Cheesecake cremoso con cobertura de fresas frescas.',
      price: 79.99,
      category: 'Postre',
      images: ['cheesecake-de-fresa.jpg'],
    },
    {
      name: 'Gelatina de Mosaico',
      description: 'Gelatina de mosaico colorida, servida con crema batida.',
      price: 39.99,
      category: 'Postre',
      images: ['gelatina-de-mosaico.jpg'],
    },
    {
      name: 'Brownie de Chocolate',
      description: 'Brownie de chocolate denso y húmedo, servido con helado de vainilla.',
      price: 59.99,
      category: 'Postre',
      images: ['brownie-de-chocolate.jpg'],
    },
  ],
};

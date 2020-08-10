const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['products', 'inspirations'],
    count: 147,
    image: require('../assets/icons/plants.png'),
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['products', 'shop'],
    count: 16,
    image: require('../assets/icons/seeds.png'),
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['products', 'inspirations'],
    count: 68,
    image: require('../assets/icons/flowers.png'),
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['products', 'shop'],
    count: 17,
    image: require('../assets/icons/sprayers.png'),
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../assets/icons/pots.png'),
  },
  {
    id: 'fertilizers',
    name: 'Fertilizres',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../assets/icons/fertilizers.png'),
  },
];

const products = [
  {
    id: 1,
    name: '16 Best Plants That Thrive in Your Bedroom',
    description:
      "Houseplants can do more than just bring a splash of green indoors, it turns out ... especially when they're in your bedroom. A famous 1989 NASA study found that such plants were able to reduce indoor air pollutants such as benzene and formaldehyde, at least in a controlled lab environment, and more recent research says plants may make you feel less stressed and more creative. That can never be a bad thing. Here are a few of the best air-purifying plants to consider keeping in your bedroom at home.",
    tags: ['Interior', '27 m2', 'Ideas'],
    images: [
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
    ],
  },
];

const explore = [
  require('../assets/images/explore_1.png'),
  require('../assets/images/explore_2.png'),
  require('../assets/images/explore_3.png'),
  require('../assets/images/explore_4.png'),
  require('../assets/images/explore_5.png'),
  require('../assets/images/explore_6.png'),
];

const profile = {
  username: 'Jhonny Walker',
  location: 'Europe',
  email: 'jhonny.walker@thedeveloper.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthlyCap: 5000,
  notifications: true,
  newslatter: false,
};

export { categories, explore, products, profile };

import Book from "../models/Book.js";

const books = [
  {
    title: 'JavaScript Essentials',
    author: 'Daniel Cooper',
    category: 'Programming',
    price: 19.99,
    image: 'https://picsum.photos/seed/js-essentials/420/600',
    description: 'JavaScript Essentials explains variables, functions, arrays, objects, asynchronous code, and practical coding exercises. It is written in simple language for students building real projects.',
    summary: 'A beginner-friendly guide to modern JavaScript.',
    stock: 50,
  },
  {
    title: 'React in Real Projects',
    author: 'Aisha Rahman',
    category: 'Web Development',
    price: 24.5,
    image: 'https://picsum.photos/seed/react-projects/420/600',
    description: 'This book covers components, props, hooks, routing, and state management through practical ecommerce and dashboard examples. Great for college mini projects and portfolio work.',
    summary: 'Build polished UIs with React step by step.',
    stock: 40,
  },
  {
    title: 'Node & Express Starter',
    author: 'Rohan V.',
    category: 'Web Development',
    price: 18.75,
    image: 'https://picsum.photos/seed/node-express/420/600',
    description: 'Learn routing, middleware, authentication basics, and MongoDB integration with clean examples. Ideal for MERN beginners who need practical backend understanding.',
    summary: 'Create backend APIs quickly with Express.',
    stock: 30,
  },
  {
    title: 'Python for Data Science',
    author: 'Mira Bennett',
    category: 'Data Science',
    price: 27.0,
    image: 'https://picsum.photos/seed/python-data/420/600',
    description: 'A hands-on guide to data cleaning, exploration, and visualization with practical mini projects. Perfect for students entering data science and analytics.',
    summary: 'Data analysis using NumPy, Pandas, and visualization.',
    stock: 25,
  },
  {
    title: 'Machine Learning Made Simple',
    author: 'Arjun Malik',
    category: 'AI & Machine Learning',
    price: 31.99,
    image: 'https://picsum.photos/seed/ml-simple/420/600',
    description: 'Covers supervised and unsupervised learning, model evaluation, and real project workflow in beginner-friendly language. A strong pick for AI students.',
    summary: 'Understand ML concepts without heavy math fear.',
    stock: 20,
  }
];

export const seedDB = async () => {
  try {
    const count = await Book.countDocuments();
    if (count === 0) {
      await Book.insertMany(books);
      console.log("🌱 Database seeded with initial books");
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

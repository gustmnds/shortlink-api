import { userRepository } from '../src/repositories/UsersRepository';

async function tests() {
  const result = await userRepository.create({
    name: 'temp',
    email: 'temp@gmail.com',
    password: 'epic_password',
  });

  const user = await userRepository.findById(result.id);

  console.log(user);
}

tests();

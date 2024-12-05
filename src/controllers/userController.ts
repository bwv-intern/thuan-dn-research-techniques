import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import User from '../database/models/users';
import { UserDTO } from '../DTO/UserDTO';

export async function createUser(req: Request, res: Response) {
  const createUserDTO = plainToInstance(UserDTO, req.body);

  const errors = await validate(createUserDTO);
  console.log('Check error validate schema: ', errors);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints
      }))
    });
  }

  try {
    createUserDTO.validatePasswordMatch();
  } catch (error) {
    return res.send('Error when validate password');
  }

  try {
    const user = await User.create({
      email: createUserDTO.email,
      password: createUserDTO.password,
      fullName: createUserDTO.fullName
    });

    return res.send('Create user successfully');
  } catch (error) {
    console.error(error);
    return res.send('Error when create user');
  }
}

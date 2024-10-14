import fs from 'fs';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import sha1 from 'sha1';
import Hiker from '../models/hiker';
import authenticateUser from './utils';

const SECRET = process.env.SECRET;

class AuthController {
  static async signUp(req, res) {
    const { email, password, firstName, lastName } = JSON.parse(req.fields.json);
    const { image } = req.files;

    const fields = {
      email,
      password,
      firstName,
      lastName
    };
    for (const field in fields) {
      if (!fields[field]) {
        return res.status(400).json({'error': `Missing required field [${field}]`});
      }
    }
    const existingUser = await Hiker.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({'error': 'Email already registered'});
    }
    const newUser = new Hiker({
      email,
      password: sha1(password),
      firstName,
      lastName,
    });

    if (image) {
      const fileName = v4();
      const newFilePath = `./public/profile_pics/${fileName}`;

      await fs.promises.rename(image.path, newFilePath);
      newUser.image = fileName;
    }
    await newUser.save();
    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "1h" });
    res.setHeader('Set-Cookie', `Hikeroo-Token: ${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax;`);
    return res.status(201).json({
      id: newUser.id,
      email,
      firstName,
      lastName,
      token,
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const fields = {
      email,
      password
    };
    for (const field in fields) {
      if (!fields[field]) {
        return res.status(400).json({ error: `Missing required field [${field}]` });
      }
    }
    const hiker = await Hiker.findOne({
      email,
    });
    if (!hiker) {
      return res.status(404).json({ error: `No user found for ${email}` });
    }
    if (hiker.password !== sha1(password)) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    const token = jwt.sign({ id: hiker.id }, SECRET, { expiresIn: '1h' });
    return res.cookie('Hikeroo-Token', token).send({
      id: hiker.id,
      email,
      firstName: hiker.firstName,
      lastName: hiker.lastName,
      image: hiker.image,
      token,
    });
  }

  static async logout(req, res) {
    const user = await authenticateUser(req, res);

    if (user) {
      res.clearCookie('Hikeroo-Token');
      return res.json({});
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default AuthController;

import jwt from 'jsonwebtoken';
import sha1 from 'sha1';
import Hiker from '../models/hiker';
import authenticateUser from './utils';

const SECRET = process.env.SECRET;

class AuthController {
  static async signUp(req, res) {
    const { email, password, firstName, lastName } = req.body;

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

    await newUser.save();
    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "1h" });
    res.cookie('Hikeroo-Token', token);
    return res.status(201).json({
      id: newUser.id,
      email,
      firstName,
      lastName,
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
    res.cookie('Hikeroo-Token', token);
    return res.status(200).json({
      id: hiker.id,
      email,
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

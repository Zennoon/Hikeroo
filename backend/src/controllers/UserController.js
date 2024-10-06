import authenticateUser from './utils';

class UserController {
  static async getMe(req, res) {
    const hiker = await authenticateUser(req, res);

    if (hiker) {
      return res.json(hiker.toJson());
    }
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export default UserController;

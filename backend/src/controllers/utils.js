import jwt from 'jsonwebtoken';
import Hiker from '../models/hiker';

const SECRET = process.env.SECRET;

const authenticateUser = async function(req, res) {
  const token = req.cookies['Hikeroo-Token'];

  console.log(token);
  try {
    const jwtUser = jwt.verify(token, SECRET);

    if (jwtUser) {
      const hiker = await Hiker.findById(jwtUser.id);

      if (hiker) {
        return hiker;
      }
    }
  } catch (err) {
    return null;
  }
};

export default authenticateUser;

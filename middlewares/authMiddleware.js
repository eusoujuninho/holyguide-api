import admin from 'firebase-admin';

// Middleware para verificar o token de ID do Firebase
const authenticate = async (req, res, next) => {
  next();
  
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Failed to authenticate token' });
  }
};

export default authenticate;

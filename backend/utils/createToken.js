import jwt from 'jsonwebtoken'
//creating a token


const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // set JWT as an HTTP-only cookie

    res.cookie('jwt', token, {
        httpOnly: true,

        // when we launch or deploy our website this 
        // it will not be in development mode hence secure is set to below condition
        // despite node_env being set to "development" in our .env and also sameSite is set to "strict"
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken; 
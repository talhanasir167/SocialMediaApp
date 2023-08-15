const { PrismaClient } = require('@prisma/client')
const asyncHandler = require('express-async-handler')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const emailService = require('../emailService');

const register = asyncHandler(async (req, res) => {
	console.log(req.body)
	const { username, email, password } = req.body;
	if (!username || !password || !email) {
		res.status(404)
		throw new Error("All fields are mandotory")
	}

	
	const hashPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: { username, email, password: hashPassword }
	});
	
	if (user) {
		req.body.subject = 'Registered Successfully';
		req.body.text = 'Here is the text of register user';
		emailService.sendRegistrationEmail(req.body);
		res.status(201).json({ _id: user.id, email: user.email, username: user.username })
	} else {
		res.status(400)
		throw new Error("User not created")
	}
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email, !password) {
		res.status(400)
		throw new Error("Some Fileds are empty")
	}

	const user = await prisma.user.findFirst({
		where: {
			email: email
		}
	})

	req.body.subject = 'Login Successfully';
	req.body.text = 'Here is the text of Login user';
	emailService.sendRegistrationEmail(req.body);

	// if (user && await bcrypt.compare(password, user.password)) {
	// 	const accessToken = jwt.sign({
	// 		user: {
	// 			username: user.username,
	// 			email: user.email,
	// 			id: user.id,
	// 		}
	// 	}, process.env.ACCESS_TOKEN_SECRET,
	// 		{ expiresIn: "15m" });
	// 	res.status(200).json({ accessToken });
	// } else {
	// 	res.status(401)
	// 	throw new Error("Something is not valid you entered")
	// }
});

module.exports = { register, login }
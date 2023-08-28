const { PrismaClient } = require('@prisma/client')
const asyncHandler = require('express-async-handler')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const emailService = require('../emailService');
const jwt = require('jsonwebtoken')
const path = require('path');

const register = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !password || !email) {
		res.status(400).send("All fields are mandatory");
		return;
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			email: email
		}
	});

	if (existingUser) {
		res.status(400).send("User with this email already exists");
		return;
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const newUser = await prisma.user.create({
		data: { username, email, password: hashPassword }
	});

	if (newUser) {
		// req.body.subject = 'Registered Successfully';
		// req.body.text = 'Here is the text of register user';
		// emailService.sendRegistrationEmail(req.body);
		res.redirect('/login');
	} else {
		res.status(500).send("User creation failed");
	}
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400)
		throw new Error("Some Fileds are empty")
	}

	const user = await prisma.user.findFirst({
		where: {
			email: email
		}
	})

	if (user && await bcrypt.compare(password, user.password)) {
		const token = jwt.sign({
			user: {
				username: user.username,
				email: user.email,
				id: user.id,
			}
		}, process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "55m" });

			// req.body.subject = 'Login Successfully';
			// req.body.text = 'Here is the text of Login user';
			// emailService.sendRegistrationEmail(req.body);

			// res.cookie("authorization", token, { expires: new Date(Date.now() + 900000) });
			res.redirect(`/users/jwttest?token=${encodeURIComponent(token)}`);
	} else {
		res.status(401)
		throw new Error("Something is not valid you entered")
	}
});

module.exports = { register, login }
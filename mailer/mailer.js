const nodemailer = require('nodemailer');

const mailConfig = {
	host: "sdf",
	port:5000 ,
	auth: {
		user: 'adsf',
		pass: 'qwer'
	}

}

/*nodemailer.createTestAccount((err, account)=>{
	if (err) {
		console.error('Fallo la creacion del est en la cuenta' + err.message);
		return process.exit(1);
	}

	console.log('Credenciales obtenidas...');

	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user:'grayce.wisoky91@ethereal.email',
			pass:'kkdncdscidsj'
		}

	});

	let message = {
			from: 'alba00@gmail.com',
			to: 'grayce.wisoky91@ethereal.email',
			subject: 'Nodemailr is unicode friendly',
			text: 'Hola mundo...',
			html: '<p><b>Hola</b> mundo...</p>'
	};

	transporter.sendMail(message, (err, info)=>{
		if (err) {
			console.log('Ocurrio un error', + err.message);
			return process.exit(1);
		}

		console.log('Mensaje enviado:  %s ', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	});


});*/

module.exports = nodemailer.createTransport(mailConfig)
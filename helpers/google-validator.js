const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async function verify(token ="") {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  //console.log("ticket", ticket);

  const {name, email} = ticket.getPayload();
  return {
        nombre:name,
        correo:email
    };
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
//verify().catch(console.error);

module.exports = {
    googleVerify
}
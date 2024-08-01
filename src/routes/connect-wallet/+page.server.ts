import NeucronSDK from 'neucron-sdk';
import prisma from './database';

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();

    const neucron = new NeucronSDK();
    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
    console.log(loginResponse);

    const DefaultWalletBalance = await walletModule.getWalletBalance({});
    console.log(DefaultWalletBalance);

    const addresses = await walletModule.getAddressesByWalletId({});
    console.log(addresses);

    // Insert the login data into the database
    try {
      const user = await prisma.user.upsert({
        where: { email: data.get('email') },
        update: {
          password: data.get('password'),
          walletAddress: addresses.data.addresses[0]

        },
        create: {
          email: data.get('email'),
          password: data.get('password'),
          walletAddress: addresses.data.addresses[0]
        }
      });
      console.log('User logged in data saved to database:', user);
    } catch (err) {
      console.error('Database error:', err);
    }

    return { success: true, address: addresses.data.addresses[0], balance: DefaultWalletBalance.data.balance.summary };
  },

  signup: async ({ request }) => {
    const data = await request.formData();

    const neucron = new NeucronSDK();
    const authModule = neucron.authentication;

    const signUpResponse = await authModule.signUp({ email: data.get('email'), password: data.get('password') });
    console.log(signUpResponse);

    
    const phoneVerificationResponse = await authModule.phone({ phone: 9634464906, country_code: 91 });
    console.log(phoneVerificationResponse);

    const verifyPhoneResponse = await authModule.verifyPhoneNo({ phone: '9634464906', otp: '2780' });
    console.log(verifyPhoneResponse);
    // Insert the signup data into the database
    
    try {
      const user = await prisma.user.create({
        data: {
          email: data.get('email'),
          password: data.get('password')
        }
      });
      console.log('User signup data saved to database:', user);
    } catch (err) {
      console.error('Database error:', err);
    }

    return { success: true };
  },
};
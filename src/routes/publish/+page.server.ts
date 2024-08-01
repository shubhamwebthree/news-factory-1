import NeucronSDK from "neucron-sdk";

/** @type {import('./$types').Actions} */

export const actions = {
  pay: async ({ request }) => {
    try {
      const data = await request.formData();
      const email = data.get('email');
      const password = data.get('password');

      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;

      // Login the user with email and password
      const loginResponse = await authModule.login({ email, password });

      if (loginResponse.success) {
        console.log('Login successful:', loginResponse);
        
        // Extract additional information if needed
        const user = loginResponse.user;
        console.log('User data:', user);
        
        // For example, accessing a user ID or token
        const userId = user.id; // Assuming the response includes user details
        const token = loginResponse.token; // If a token is provided

        // You can proceed with other operations, such as fetching wallet data or making a payment
        const walletModule = neucron.wallet;
        const walletKeys = await walletModule.getWalletKeys({});
        console.log('Wallet Keys:', walletKeys);

        const options = {
          outputs: [
            {
              address: data.get('paymail'),
              note: data.get('note'),
              amount: Number(data.get('amount'))
            }
          ]
        };

        const payResponse = await neucron.pay.txSpend(options);
        console.log('Payment response:', payResponse);

        return { success: true, payment: payResponse.data.txid };
      } else {
        console.error('Login failed:', loginResponse.error);
        return { success: false, error: 'Login failed. Please check your credentials.' };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return { success: false, error: 'An error occurred during the payment process.' };
    }
  },
};

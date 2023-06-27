import {auth} from '../../infra/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export const forgotPassword = (user) => {
    sendPasswordResetEmail(auth, user.email)
    .then(() => {
      console.log('Password reset email sent');
    })
    .catch((error) => {
      console.log('Error sending password reset email:', error);
    });
}

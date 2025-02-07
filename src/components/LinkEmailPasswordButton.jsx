import openfort from '../utils/openfortConfig';
import { EmbeddedState } from '@openfort/openfort-js';
import { useOpenfort } from '../hooks/useOpenfort';
import { useOpenfortStore } from '../utils/openfortStore';

export default function GuestLoginButton() {
    const { state } = useOpenfort();
    const authToken = useOpenfortStore((state) => state.authToken);




    async function linkEmailPassword() {
        // const email = prompt("Please enter your email", "");
        // const password = prompt("Please enter your password", "");
        // const email = "kirklayer@gmail.com"
        // const password = "12345678"
        const email = "YOUR_EMAIL"
        const password = "YOUR_PASSWORD"

        const authToken = openfort.getAccessToken()
        console.log(authToken)

        // await openfort.linkEmailPassword({ email, password, authToken });
    }







    return (
        <>
            <button
                disabled={state !== EmbeddedState.READY}
                onClick={linkEmailPassword}>Link Email Password</button>
        </>
    );
}
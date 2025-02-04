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
        const email = "kirklayer@gmail.com"
        const password = "12345678"
        const authToken = localStorage.getItem("authToken")
        console.log(authToken)

        await openfort.linkEmailPassword({ email, password, authToken });
    }


    const handleGuest = async () => {
        // setStatus({
        //   type: "loading",
        //   title: "Signing in...",
        // });

        const data = await openfort
            .signUpGuest()
            .catch((error) => {
                // setStatus({
                //   type: "error",
                //   title: "Error signing in",
                // });
                console.error(error);
            });
        if (data) {
            //   setStatus({
            //     type: "success",
            //     title: "Successfully signed in",
            //   });
            console.log(data)
            openfort.storeCredentials({
                player: data.player.id,
                accessToken: data.token,
                refreshToken: data.refreshToken,
            });

            const password = prompt("Please enter your recovery password, Password recovery must be at least 4 characters", "");
            const tmp = {
                method: "password",
                password: password,
                chainId: 80002
            }
            handleRecovery(tmp)
        }
    }





    return (
        <>
            <button
                disabled={state !== EmbeddedState.READY}
                onClick={linkEmailPassword}>Link Email Password</button>
        </>
    );
}
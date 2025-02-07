import openfort from '../utils/openfortConfig';
import { EmbeddedState } from '@openfort/openfort-js';
import { useOpenfort } from '../hooks/useOpenfort';
import { useOpenfortStore } from '../utils/openfortStore';

export default function GuestLoginButton() {
    const { state } = useOpenfort();
    const { handleRecovery } = useOpenfort();
    const setAuthToken = useOpenfortStore((state) => state.setAuthToken);


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
            console.log(data.token)
            setAuthToken(data.token);
            // openfort.storeCredentials(data)
            // localStorage.setItem("authToken", data.token);
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
                disabled={state === EmbeddedState.READY}
                onClick={handleGuest}>Guest Login</button>
        </>
    );
}
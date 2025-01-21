import openfort from '../utils/openfortConfig';
import { useOpenfort } from '../hooks/useOpenfort';

export default function GuestLoginButton() {
    const { handleRecovery } = useOpenfort();


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
            //   router.push("/");
            console.log(data)
            const tmp = {
                method: "password",
                password: "test",
                chainId: 80002
            }
            handleRecovery(tmp)
        }
    }





    return (
        <>

            <button onClick={handleGuest}>Guest Login</button>
        </>
    );
}
import { EmbeddedState } from '@openfort/openfort-js';
import { useOpenfort } from '../hooks/useOpenfort';

export default function ShowEmbeddedState() {

    const { state } = useOpenfort();
    // console.log(EmbeddedState)
    // console.log(state)


    return (
        <>
            <h3>Current <a href="https://www.openfort.xyz/docs/guides/javascript/use-openfort#waiting-for-ready" target="_blank">
                Embedded State
            </a> : {EmbeddedState[state]}</h3>

        </>
    )

}
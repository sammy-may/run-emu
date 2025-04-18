export default Page;

import { usePageContext } from "vike-react/usePageContext";

function Page() {
    const { is404 } = usePageContext();
    if (is404) {
        return (
            <>
                <h1>404 Page Not Found</h1>
                <p>This page could not be found.</p>
            </>
        );
    } else {
        return (
            <>
                <h1>500 Internal Server Error</h1>
                <p>Something went wrong.</p>
            </>
        );
    }
}

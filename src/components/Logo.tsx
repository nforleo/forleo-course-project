/**
 * Return the application logo
 * @returns app image
 */
export function AppLogo () {
    return <img src={process.env.PUBLIC_URL + '/img/site_logo.png'} height="256px" width="256px" alt="Application Logo" />
}
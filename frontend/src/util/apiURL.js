export const apiURL = () => {
    return window.location.hostname === "localhost" ?
    "http://localhost:3001" : "https://flutter-backend-zay.herokuapp.com";
}
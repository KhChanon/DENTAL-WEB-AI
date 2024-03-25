const config = {
    "API_URL": `https://${process.env.REACT_APP_DNS_NAME}:8000/api`,
    "CLIENT_ID": "2003210748",
    "REDIRECT_URL": `https://${process.env.REACT_APP_DNS_NAME}:3000/`,
    "SCOPE": "profile%20openid%20email",
}

export default config;
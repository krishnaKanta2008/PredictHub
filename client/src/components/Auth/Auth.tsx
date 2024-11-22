export const checkSession = () => {
    const token = localStorage.getItem('predicthub_username');
    return token;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
};
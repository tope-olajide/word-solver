import {useState} from 'react'
const useTheme = () => {
    const [isDarktheme, setIsDarkTheme] = useState(false);
        document.documentElement.setAttribute('data-theme', themeColor);
        localStorage.setItem("theme-color", themeColor);
    const changeTheme = () => {
        setIsDarkTheme(!isDarktheme);
    }
    return {
        changeTheme
    }
}
export default useTheme
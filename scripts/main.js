document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("checkbox");
    const htmlElement = document.documentElement;

    // function to set theme
    function setTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("preferred-theme", theme);

        // update checkbox state to match theme
        themeToggle.checked = theme === "dark";
    }

    // check for saved user preference, if any
    const savedTheme = localStorage.getItem("preferred-theme");

    // if we have a saved theme, use it
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no saved preference, check system preference
        const prefersDarkScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        if (prefersDarkScheme.matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    // listen for toggle changes
    themeToggle.addEventListener("change", function () {
        if (this.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    });

    // listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            const newTheme = e.matches ? "dark" : "light";

            // only change theme if user hasn't set a preference
            if (!localStorage.getItem("preferred-theme")) {
                setTheme(newTheme);
            }
        });
});

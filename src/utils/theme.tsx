export const updateThemeLocalState = () => {
  const theme = localStorage.getItem("theme");
  if(theme == undefined){
    localStorage.setItem("theme", 'dark')
  }else{
    localStorage.setItem("theme", theme == 'light'?"dark":"light");
  }
};

export const getLocalTheme = () => {
  const theme = localStorage.getItem("theme");
  if(theme == undefined){
    return "light";
  }
  return theme;
};
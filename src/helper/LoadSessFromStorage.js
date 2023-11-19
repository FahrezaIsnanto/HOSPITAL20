export const LoadSessFromStorage = () => {
   const isLoggedIn =  localStorage.getItem('isLoggedIn');
   if(isLoggedIn){
        const user = localStorage.getItem('user');
        return {
         isLoggedIn,
         user
        }
   }
   return null;
}
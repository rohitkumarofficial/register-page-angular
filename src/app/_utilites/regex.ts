/** Vlidate username with One Upper case,One Special character is must */
export const usernameRegex = '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[@#$%^&+!=])(?=.{5,}).*$';

/** Email regex */
export const emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

/** Website Url */
export const webUrlRegex = '^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$'

/** File name regex with jpg | jpeg | gif */
export const fileNameRegex = '^.+\.(jpg|jpeg|gif)$';

/** postal code regex */
export const postalCodeRegex = '^5[0-9]{5}$';
import decode from 'jwt-decode';

export function getUserInfoFromToken(authTokens){
  if(!authTokens){
    return null;
  }
  var re = /"(.*?)"/g;
  var myArray = authTokens.match(re);
  var token = myArray[0].replace(/\"/g,"");
  return decode(token);
}

export function getBaseUrl(){
  return 'https://quiet-mesa-17901.herokuapp.com';
}

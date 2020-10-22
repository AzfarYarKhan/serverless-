'use strict';

 async function hello() {
  try {
    let response = {
      statusCode: 200,
      body: JSON.stringify('hello')
      }
    return response;     
  }
  catch(error) {
      return error;
  }
}
 
module.exports.hello = async (event) => {
  let hellostatus = await hello();
 
  return hellostatus;
}



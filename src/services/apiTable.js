/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
- The API Used, Support filtering through query parameters
- The main idea is to fetch a specific users based on parameters that we put in the URL , (Key=Value)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

*/

/* 1- 
- Way for fetching data and implement searching and pagination dynamically without using libraries.
- Used Constracutors and interfaces to update the URL dynamically without updating it manually, this makes the URL clean and more readable.
*/

// export const getUsers = async ({ search = "", page = 1, pageSize = 5 }) => {
//   const URL = new URL("https://jsonplaceholder.typicode.com/users");
//   const params = new URLSearchParams();
//   if (search) {
//     params.append("q", search)
//   }
//   params.append("_page", page);

//   params.append("_limit", pageSize);

//   URL.search = params.toString();  // convert the params object to a string

//   const response = await fetch(URL);

//   if (!response.ok) {
//     throw new Error(`Cannot fetch data ${response.status}`);
//   }

//   const total = response.headers.get("X-Total-Count");
//   const data = await response.json();
//   return { data, total };

// }



/*
  ::::::::::::::::::::::::::::::::::::::::::::
  URL Constructor:
    - With This Object, We can easily create a new URL based on the path relative to an existing URL and gives us access to the URL’s components.
    - We can normalize this url and we can then modify these components easily.
  
  URLSearchParams:
    - Takes two prameters, the first one is the key and the second one is the value.
    - In this case, we are using the append method to add the query parameters to the URL.
    - After we add the query parameters, Now we can fetch data from the updated API URL, based on the query parameters ofcourse.
  ::::::::::::::::::::::::::::::::::::::::::::
*/

// =================================

/* 2- 
  - More simple and easy war of doing the same thing but using axios library.
*/

import axios from "axios";

export const getUsers = async ({ search = "", page = 1, pageSize = 5 }) => {

  // define the params object with the query parameters
  const params = {
    q: search,
    _page: page,
    _limit: pageSize
  }

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users', { params })
    console.log(response.headers);
    const total = response.headers['x-total-count'];

    return { data: response.data, total }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

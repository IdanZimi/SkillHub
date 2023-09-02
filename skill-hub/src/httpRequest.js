import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

const port = '8000'
const apiUrl = `http://localhost:${port}/`;

export const request = {
  register: async (userData) => {
    fetch(apiUrl + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Registration successful:', data);
      })
      .catch(error => {
        throw Error(error)
      });
  },
  login: async (loginData) => {

    const response = await fetch(apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Login successful:", responseData);
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  addProjectToDB: async (project) => {
    //console.log("the project" + project)
    const response = await fetch(apiUrl + 'project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    if (response.ok) {
      const responseData = await response.json();
      return responseData.docref._key.path.segments[1]
      //console.log("Add Project successfuly:", responseData);
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  getProjects: async () => {
    const response = await fetch(apiUrl + 'projects', {
      method: 'GET'
    })
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
}
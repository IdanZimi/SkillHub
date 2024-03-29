const port = "8000";
const apiUrl = `http://localhost:${port}/`;

export const request = {
  register: async (userData) => {
    fetch(apiUrl + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful:", data);
      })
      .catch((error) => {
        throw Error(error);
      });
  },
  login: async (loginData) => {
    const response = await fetch(apiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
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
    const response = await fetch(apiUrl + "project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.docref._key.path.segments[1];
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  getProjects: async () => {
    const response = await fetch(apiUrl + "projects", {
      method: "GET",
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  sendApplyToDB: async (apply) => {
    const response = await fetch(apiUrl + "apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apply),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  getApplies: async () => {
    const response = await fetch(apiUrl + "applies", {
      method: "GET",
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  changeApplyStatus: async (applyId, applyStatus) => {
    const apply = { id: applyId, status: applyStatus };
    const response = await fetch(apiUrl + "apply/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apply),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  addToProjectsUsersTable: async (pid, uid) => {
    const data = { pid: pid, uid: uid };
    const response = await fetch(apiUrl + "projects/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  getProjectsOfUser: async (uid) => {
    const response = await fetch(apiUrl + "projects/users" + `?uid=${uid}`, {
      method: "GET",
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  getAdminUidByProjectId: async (projectId) => {
    const response = await fetch(`${apiUrl}projects/${projectId}`, {
      method: "GET",
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  updateAvailablePositions: async (skillsToUpdate, pid) => {
    const skills = { skillsToUpdate: skillsToUpdate, pid: pid };
    const response = await fetch(apiUrl + "project/positions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skills),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  deleteProjectById: async (projectId) => {
    fetch(`${apiUrl}projects/${projectId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Project deleted successfully");
          return response.body.projectId;
        } else {
          console.error("Failed to delete project");
        }
      })
      .catch((error) => {
        console.error("An error occurred in deleteProjectById:", error);
      });
  },
  updateProfilePicture: async (uid, imageURL) => {
    const data = { uid: uid, imageURL: imageURL };
    const response = await fetch(apiUrl + "user/image", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      console.error("Login error:", errorData);
    }
  },
  getUserProfilePicture: async (uid) => {
    const response = await fetch(apiUrl + "user/image" + `?uid=${uid}`, {
      method: "GET",
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("imageURL: ", responseData);
      return responseData.imageURL;
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  },
};

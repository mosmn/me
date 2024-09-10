import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DEVELOPMENT_URL;

export const getPosts = async () => {
    try {
      const response = await fetch(`${url}/blog/posts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getPublishedPosts = async () => {
    try {
      console.log("URL", url);
      const response = await fetch(`${url}/blog/posts/published`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  export const getPost = async (id : string) => {
    try {
      const response = await fetch(`${url}/blog/posts/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const likePost = async (id: string) => {
    try {
      const response = await fetch(`${url}/blog/posts/${id}/like`, {
        method: "PATCH",
        mode: "cors",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const unlikePost = async (id: string) => {
    try {
      const response = await fetch(`${url}/blog/posts/${id}/unlike`, {
        method: "PATCH",
        mode: "cors",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getComments = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/blog/posts/${id}/comments`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getReplies = async (id: string, commentId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/blog/posts/${id}/comments/${commentId}/replies`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  export const createComment = async (id: string, content: string, replyTo: string | null) => {
    try {
      const response = await fetch(`http://localhost:8080/blog/posts/${id}/comments`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content, replyTo }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  export const addReply = async (id: string, commentId: string, content: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/blog/posts/${id}/comments/${commentId}/reply`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }),
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  export const deleteComment = async (id: string, commentId: string) => {
    try {
      const response = await fetch(
        `${url}/blog/posts/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          mode: "cors",
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const likeComment = async (id: string) => {
    try {
      const response = await fetch(`${url}/blog/comments/${id}/like`, {
        method: "PATCH",
        mode: "cors",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const unlikeComment = async (id: string) => {
    try {
      const response = await fetch(`${url}/blog/comments/${id}/unlike`, {
        method: "PATCH",
        mode: "cors",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
import axios from 'axios';

// Flag to prevent multiple refresh requests
let isRefreshing = false;

// Create a response interceptor
axios.interceptors.response.use(
  response => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const originalRequest = error.config;
    if (error.response.status === 401 && !isRefreshing) {
      isRefreshing = true; // Prevent further refresh requests
      const refreshToken = localStorage.getItem('refresh_token');

      try {
        // Attempt to refresh the token
        const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/token/refresh/', {
          refresh: refreshToken,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          // If token refresh was successful, update tokens in localStorage
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);

          // Update the default axios authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;

          // Reset the isRefreshing flag
          isRefreshing = false;

          // Retry the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${response.data['access']}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure (e.g., refresh token is expired)
        isRefreshing = false;
        console.error('Token refresh failed:', refreshError);
        // Redirect user to login page, or handle failure appropriately
        // For example:
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // If the error is not due to a 401 Unauthorized response, or if refreshing did not work, just return the error
    return Promise.reject(error);
  }
);

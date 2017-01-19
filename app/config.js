let apiUrl = 'http://localhost:5000'
if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://api.ocp.nz
}
export {
  apiUrl
}

export const secretToken = 'some secret token'

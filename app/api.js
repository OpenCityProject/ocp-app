import { apiUrl, secretToken } from './config'
import _ from 'lodash'

class Api {
  constructor(options){
    this.apiUrl = apiUrl
    this.prefix = '/v1'
    if (!options){
      return
    }
    const {token, clearUser} = options
    this.token = token
  }
  setToken(token){
    this.token = token
  }
  secretToken = secretToken
  unauthedHeaders(){
    return {
      'Accept': 'application/json'
    , 'Content-Type': 'application/json'
    , 'Authorization': 'OCP ' + this.secretToken
    }
  }
  authedHeaders(){
    return {
      'Accept': 'application/json'
    , 'Content-Type': 'application/json'
    , 'Authorization': 'OCP ' + this.token
    }
  }
  handleUnauthed(res){
    if (res.status === 401) {
      //db.cleanDb()
      return new Promise(()=>{})
    } else {
      return res
    }
  }
  _buildQueryString(data){
    return '?' + Object.keys(data).map(d=>d+'='+encodeURIComponent(data[d]))
  }
  async _handleStatus(response){
    const status = response.status
    const ok = response.ok
    if (status >= 500) {
      console.error('Sorry, server had a problem, status code:', status)
      return new Promise(()=>{})
    }
    const json = await response.json()
    if (ok){
      return json
    }
    const message = r && r.message || 'No answer from server'
    console.error('Sorry, you made a bad request, status code:', status, message)
    return new Promise(()=>{})
  }
}
export class Users extends Api{
  constructor(options){
    super(options)
    this.prefix += '/users'
  }
  register(options){
    // should contain username, password, email, age, gender, country
    return fetch(this.apiUrl + this.prefix, {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify(options)
    })
  }
  login(username, password, os){
    return fetch(this.apiUrl + this.prefix + '/login', {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify({username, password, os})
    })
  }
  checkUsername(username){
    return fetch(apiUrl + this.prefix + '/checkusername', {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify({username})
    }).then(r=>this._handleStatus(r))
  }
  addPush(pushId){
    return fetch(this.apiUrl + this.prefix + '/addpush', {
      method: 'POST'
    , headers: this.authedHeaders()
    , body: JSON.stringify({pushId})
    })
  }
  logout(){
    return fetch(this.apiUrl + this.prefix + '/logout', {
      headers: this.authedHeaders()
    })
  }
  forgotPassword(email){
    return fetch(this.apiUrl + this.prefix + '/forgotpassword', {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify({email})
    })
  }
  forgotPasswordCheckResetCode(resetCode, username){
    return fetch(this.apiUrl + this.prefix + '/forgotpassword/resetcode', {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify({resetCode, username})
    })
  }
  forgotPasswordResetPassword(username, password, resetCode){
    return fetch(this.apiUrl + this.prefix + '/forgotpassword/reset', {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify({username, password, resetCode})
    })
  }
  findUsers(text){
    return fetch(this.apiUrl + this.prefix + '/findusers', {
      method: 'POST'
    , headers: this.authedHeaders()
    , body: JSON.stringify({text})
    }).then(r=>this._handleStatus(r))
  }
  getUser(username){
    return fetch(this.apiUrl + this.prefix + '/getuser', {
      method: 'POST'
    , headers: this.authedHeaders()
    , body: JSON.stringify({username})
    }).then(r=>this._handleStatus(r))
  }
}
export class Poi extends Api{
  constructor(options){
    super(options)
    this.prefix += '/poi'
  }
  getPois(options){
    return fetch(this.apiUrl + this.prefix, {
      method: 'POST'
    , headers: this.unauthedHeaders()
    , body: JSON.stringify(options)
    })
  }
}

/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import xFetch from '../../../../utils/xFetch';
export default class Success extends Component {
  static displayName = 'Success';


  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount(){
    console.log(this.props.location.search)
    const search = this.props.location.search;
    const arr = search.split("=");
    this.loadUserInfoAndSave(arr[1]);
  }
  loadUserInfoAndSave = (accessToken) =>{
    //获取用户信息
      xFetch.get(`http://localhost:80/users/current?accessToken=${accessToken}`).then(loginUserInfo=>{
        window.parent.loginSuccessCallback(loginUserInfo);
      });
    }
  render() {
    return (
      <div >
       hello world
      </div>
      
    );
  }
}

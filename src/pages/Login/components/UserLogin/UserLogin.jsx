/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid, Feedback,Dialog } from '@icedesign/base';
import { Redirect } from 'react-router-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';
import xFetch from '../../../../utils/xFetch';
const { Row, Col } = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage = require('./images/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png');

let websocket = null;

let QC = window.QC;
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loginSuccess:false,
      visible: false,
      image:undefined,
      value: {
        imageToken:undefined,
        account: undefined,
        password: undefined,
        rememberme: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  componentDidMount(){
    //获取验证码
    //validateCodeImage:
    xFetch.get("http://120.78.175.69:8080/code/image").then(data=>{
      this.setState({image:data.image,value:{...this.state.value,imageToken:data.valiateToken}})
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      xFetch.post("http://120.78.175.69:8080/authentication/login",values).then(data=>{
        data && this.loginSuccessHandler(data);
      });      
      
    });
  };

  getUsers = ()=>{
    xFetch.get("http://120.78.175.69:8080/users").then(data=>{
      console.log(data);
    });

  }

 
  onClose = ()=>{
     this.setState({visible:false}); 
  }
  cbLoginFun = (oInfo, oOpts)=>{
    alert(oInfo.nickname); // 昵称
    alert(oOpts.btnId);    // 点击登录的按钮Id
  }

  openQQ = ()=>{
    if(!this.state.sessionId){
      websocket = new WebSocket("ws://120.78.175.69:8080/websocket");
    }else{
      websocket.send(this.state.sessionId);
    }
    // 建立 web socket 连接成功触发事件
    websocket.onopen = (evt) => {};
    // 接收服务端数据时触发事件
    websocket.onmessage = (evt) => {
      var received_msg = evt.data;
      try{
        const json = JSON.parse(received_msg);
        this.setState({visible:false},()=>{
          this.loginSuccessHandler(json);
          websocket.close();
        });
      }catch(error){
        this.setState({sessionId:evt.data},this.setState({visible:true}));
      }
    };
    // 断开 web socket 连接成功触发事件
    websocket.onclose = ()=> {
       this.setState({sessionId:undefined});
    };
    websocket.onerror = (e)=>{
      this.setState({sessionId:undefined});
    }
  }
  //登录成功后处理器
  loginSuccessHandler = (userInfo)=>{
    Feedback.toast.success('登录成功');
    this.saveAccessToken(userInfo);
    this.setState({loginSuccess:true});
  }
  saveAccessToken = (userInfo)=>{
    if(window.localStorage){
        localStorage.setItem("accessToken",userInfo.accessToken);
        localStorage.setItem("userInfo",userInfo);
    }else{
      console.warn("你的浏览器不支持localStorage,token将保存到sessionStorage");
      sessionStorage.setItem("accessToken",accessToken);
      sessionStorage.setItem("userInfo",userInfo);
    }
  }
  //利用react钩子函数实现实时刷新    
  componentWillUnmount() { 
    !!websocket && websocket.close();
  }

  render() {

    if (this.state.loginSuccess) {
      return <Redirect push to={"/homeIndex"} />;
    }
    const footer = (
      <a  href="javascript:;"></a>
    );
    const image = this.state.image;
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            welcome login
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="person"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="account" required message="必填" >
                      <Input maxLength={20} width="140px" placeholder="会员名/邮箱/手机号" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col span="12">
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="password" required message="必填">
                      <Input htmlType="password" placeholder="密码" />
                    </IceFormBinder>
                  </Col>
                  <Col span="5">
                    <IceFormError name="password" />
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col className = "image-input">                 
                   <IceIcon
                      type="publish"
                      size="small"
                      style={styles.valiCodeIcon}
                    />
                    <IceFormBinder name="imageCode"  required message="必填">
                      <Input  maxLength={4} placeholder="验证码" />
                    </IceFormBinder>     
                    <IceFormError name="imageCode" />
                  </Col>   
                  
                  <Col>
                     <span className = "image-code">
                         <img  src={image} />
                      </span>
                  </Col>                
                  
                </Row>
                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder name="rememberme">
                      <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    style={styles.submitBtn}
                  >
                    登 录
                  </Button>
                </Row>

                <Row className="tips" style={styles.tips}>
                  <a href="/" style={styles.link}>
                    立即注册
                  </a>
                  <span style={styles.line}>|</span>
                  <a  onClick={this.openQQ} style={styles.link}>
                    QQ登录
                  </a>
                  <span style={styles.line}>|</span>
                  <span id="qqLoginBtn"></span>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
        <div>
        <Dialog
          visible={this.state.visible}
          onClose={this.onClose}
          title="qq登录"
          footer={footer}
        >
        <iframe id="qqLogin" src={`http://www.525qz.site/auth/qq.do?state=${this.state.sessionId}`} onLoad={this.load} height="400" width="800" frameBorder="0px"> 
          
        </iframe>
        </Dialog>
        </div>
      </div>
      
    );
  }
}

const styles = {
  slogan:{
    color:"#3080FE"
  },
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'row',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  valiCodeIcon: {
    position: 'absolute',
    left: '0px',
    top: '10px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};

import React, { Component } from 'react';

const style = {
  introBannerWrapStyles: {
    width: '100%',
    height: '450px',
    position: 'relative',
    overflow: 'hidden',
  },
  introBannerImgStyles: {
    position: 'absolute',
    top: '0',
    left: '50%',
    display: 'block',
    width: '1920px',
    height: '100%',
    transform: 'translateX(-50%)',
    zIndex: '10',
  },
  introBannerImgMaskStyles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    background: '#000',
    opacity: '.45',
    zIndex: '15',
  },
  introBannerTextStyles: {
    position: 'absolute',
    top: '112px',
    zIndex: '15',
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: '40px',
    color: '#fff',
    pointerEvents: 'none',
  },
  introBannerTitleStyles: {
    fontWeight: '400',
    fontSize: '50px',
    lineHeight: '70px',
  },
  introBannerSubtitleStyles: {
    marginTop: '8px',
    marginBottom: '48px',
    maxWidth: '768px',
    fontSize: '16px',
    lineHeight: '25px',
  },
};

export default class IntroBanner extends Component {
  static displayName = 'IntroBanner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="intro-banner-wrap" style={style.introBannerWrapStyles}>
        <img
          className="intro-banner-img"
          src={require('./images/intro.jpg')}
          style={style.introBannerImgStyles}
          alt=""
        />
        <div
          className="intro-banner-img-mask"
          style={style.introBannerImgMaskStyles}
        />
        <div className="intro-banner-text" style={style.introBannerTextStyles}>
          <h2
            className="intro-banner-title"
            style={style.introBannerTitleStyles}
          >
            智慧社区，未来生活
          </h2>
          <p
            className="intro-banner-subtitle"
            style={style.introBannerSubtitleStyles}
          >
            输出支付，账户体系，信用金融，电商，采购，文化公益和大数据等能力和资源，助力社区物业通过提升信息化、智能化水平，改善物业管理水平和服务品质，推动建设便利舒适、安全和谐的智慧社区
          </p>
        </div>
      </div>
    );
  }
}

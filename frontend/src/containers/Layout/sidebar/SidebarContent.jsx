import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToDark, changeToLight } = this.props;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/log_in" onClick={this.hideSidebar} />
          <SidebarCategory title="Theme" icon="layers">
            <button type="button" className="sidebar__link" onClick={changeToLight}>
              <p className="sidebar__link-title">Light</p>
            </button>
            <button type="button" className="sidebar__link" onClick={changeToDark}>
              <p className="sidebar__link-title">Dark</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Settings" icon="cog" route="/pages/settings" onClick={this.hideSidebar} />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;

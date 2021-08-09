import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';

class SidePanel extends React.Component {
  render() {
    const { currentUser } = this.props;

    return(
      <Menu
        size="large"
        fixed="left"
        vertical
        style={{ background: 'teal', fontSize: '1.2rem' }}
      >
        <UserPanel currentUser={currentUser} />
      </Menu>
    )
  }
}

export default SidePanel;

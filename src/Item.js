import Popover from '@material-ui/core/Popover';
import React, { createRef, Component, Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      isEditing: false,
      mousedOver: false,
    };
    this.itemRef = createRef();
  }
  handleMouseEnter = evt => this.setState({ mousedOver: true });
  handleMouseLeave = evt => this.setState({ mousedOver: false });
  handleEditMode = isEditing => {
    this.setState({ isEditing });
  };

  render() {
    const { _oid, children, onSelect, selected, title, value } = this.props;
    const { anchorEl, isEditing, mousedOver } = this.state;

    return (
      <Fragment>
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div
            style={{
              padding: 2,
              cursor: 'pointer',
              display: 'inline-block',
              borderRadius: 6,
              background: selected ? 'rgba(190, 144, 212, 1)' : 'lightgray',
              border: '1px solid rgba(115, 101, 152, 1)',
            }}
            onClick={evt => {
              evt.stopPropagation();
              onSelect(evt, _oid);
            }}
            ref={this.itemRef}
          >
            <Tooltip title={value}>
              <span>{title}</span>
            </Tooltip>
          </div>
          {mousedOver && !!children && (
            <button
              onClick={evt => {
                evt.stopPropagation();
                this.setState({anchorEl: evt.target.parentNode}, () => {this.handleEditMode(true)});
              }}
            >
              edit
            </button>
          )}
        </div>
        {!!children && <Popover
          open={isEditing}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          onClose={evt => this.handleEditMode(false)}
        >
          {children(() => this.handleEditMode(false))}
        </Popover>
        }
      </Fragment>
    );
  }
}
export default Item;

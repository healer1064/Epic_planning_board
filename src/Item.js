import Popover from '@material-ui/core/Popover';
import React, { createRef, Component, Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      isEditing: false,
    };
    this.itemRef = createRef();
  }
  handleEditMode = isEditing => {
    this.setState({ isEditing });
  };

  render() {
    const { _oid, children, onSelect, selected, title, value } = this.props;
    const { anchorEl, isEditing } = this.state;
    return (
      <Fragment>
        <div
          style={{
            padding: 2,
            cursor: 'pointer',
            display: 'inline-block',
            borderRadius: 6,
            background: selected ? 'rgba(190, 144, 212, 1)' : 'lightgray',
            border: '1px solid rgba(115, 101, 152, 1)',
            whiteSpace: 'nowrap',
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
          {selected && !!children && (
            <IconButton
              color="primary"
              onClick={evt => {
                evt.stopPropagation();
                this.setState({ anchorEl: evt.target.parentNode }, () => {
                  this.handleEditMode(true);
                });
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>

        {!!children && (
          <Popover
            open={isEditing}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            onClose={evt => this.handleEditMode(false)}
          >
            {children(() => this.handleEditMode(false))}
          </Popover>
        )}
      </Fragment>
    );
  }
}
export default Item;

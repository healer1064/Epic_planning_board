import cn from "classnames";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ItemList from "./ItemList";
import RatingBoard from "./RatingBoard";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  app: {
    overflow: "hidden",
    display: "flex"
  }
});

const EditDimension = ({
  attribute,
  classes,
  items,
  onSelect,
  onUpdate,
  selected,
  tiers
}) => (
  <div className={cn(classes.app, "App")}>
    <ItemList
      items={items.sort((a, b) => b[attribute] - a[attribute])}
      onSelect={onSelect}
      selected={selected}
    />
    <RatingBoard
      items={items
        .map(i => ({ ...i, value: i[attribute] }))
        .sort((a, b) => b.value - a.value)}
      tiers={tiers}
      selected={selected}
      onSelect={onSelect}
    >
      {(item, close) => (
        <Paper>
          <div style={{ padding: 16 }}>
            <h4>{attribute}</h4>
            <TextField
              defaultValue={item[attribute]}
              onKeyDown={evt => {
                if (evt.key === "Enter") {
                  onUpdate({
                    _oid: item._oid,
                    [attribute]: parseInt(evt.target.value)
                  });
                  close();
                } else if (evt.key === "Escape") {
                  close();
                }
              }}
            />
          </div>
        </Paper>
      )}
    </RatingBoard>
  </div>
);

export default withStyles(styles)(EditDimension);

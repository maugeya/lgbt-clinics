import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import LikeClinic from "./LikeClinic"

const createdAddress = (clinic) => {
  return (
    <span>
      <span className="clinicAddressItem">{clinic.address1}</span>
      <span className="clinicAddressItem">{clinic.address2}</span>
      <span className="clinicAddressItem">{clinic.town}</span>
      <span className="clinicAddressItem">{clinic.county}</span>
      <span className="clinicAddressItem">{clinic.postcode}</span>
      <a className="clinicUrl" href={clinic.url} target="_blank" rel="noopener noreferrer">{clinic.url}</a>
    </span>
  )
}

const ClinicList = ({ classes, clinics }) => (
  <List className={classes.clinicListContainer}>
    {clinics.map(clinic => (
      <ListItem className={classes.root} key={clinic.id}>
        <LikeClinic />
        <ListItemText
          primaryTypographyProps = {{
            variant: "subheading",
            color: "primary" 
          }}
          primary={clinic.name}
          secondary={createdAddress(clinic)}
        />
      </ListItem>
    ))}
  </List>
);

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid grey",
    borderRadius: "10px",
    margin: "10px 0"
  },
  clinicAddressItem: {
    display: "block"
  },
  clinicUrl: {
    display: "block"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
};

export default withStyles(styles)(ClinicList);
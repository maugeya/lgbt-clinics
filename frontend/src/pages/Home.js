
import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"

const Home = ({ classes }) => {
  return <div>Home</div>
}

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(Home)
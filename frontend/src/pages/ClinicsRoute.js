
import React, { useState } from "react"
import { Query } from "react-apollo"
import withStyles from "@material-ui/core/styles/withStyles"
import SearchClinics from "../components/Clinic/SearchClinic"
import ClinicList from "../components/Clinic/ClinicList"
import { GET_CLINICS_QUERY } from "../library/graphQL"
import Loading from "../components/Shared/Loading"
import Error from "../components/Shared/Error"

const ClinicsRoute = ({ classes }) => {
  const [searchResults, setSearchResults] = useState([])

  return (
      <div className={classes.container}>
          <SearchClinics setSearchResults={setSearchResults}/>
          <Query query={GET_CLINICS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />
              if (error) return <Error error={error} />

              const clinics = searchResults.length > 0 ? searchResults: data.clinics

              return <ClinicList clinics={clinics}/>
            }}
          </Query>
      </div>
  )
}

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(ClinicsRoute)
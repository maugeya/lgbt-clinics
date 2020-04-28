import React from "react";
import withRoot from "./withRoot";
import { Query } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ME_QUERY, GET_CLINICS_QUERY } from "./library/graphQL";
import Home from "./pages/Home";
import ClinicsRoute from "./pages/ClinicsRoute";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header";
import Loading from "./components/Shared/Loading";
import Error from "./components/Shared/Error";

const Root = () => (
    <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <Loading />
            if (error) return <Error error={error} />
            const currentUser = data.me

        return (
            <Router>
                <>
                    <Header currentUser={currentUser}/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/clinics" component={ClinicsRoute} />
                        <Route path="/profile/:id" component={Profile} />
                    </Switch>
                </>
            </Router>
        )
        }}
    </Query>
)

export default withRoot(Root)
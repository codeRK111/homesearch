import { Redirect, withRouter } from "react-router-dom";
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "../../redux/user/user.selector";

import NoPermissions from "../noPermissions/noPermissions.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import withDrawer from "../drawer/drawer.component";

const NoPermissionWithDrawer = withDrawer(NoPermissions);

const withPermission = (Component, info) => {
    const Comp = ({ isAuthenticated, user, ...otherProps }) => {
        let showMain = true;
        if (info.includes(user.type)) {
            showMain = true;
        } else {
            showMain = false;
        }
        const renderPage = () => {
            // Check login status
            if (isAuthenticated) {
                // Allow all pages  if user is super admin
                if (user.type === "super-admin") {
                    return <Component {...otherProps} />;
                } else {
                    // check permission
                    if (showMain) {
                        return <Component {...otherProps} />;
                    } else {
                        return <NoPermissionWithDrawer />;
                    }
                }
            } else {
                return <Redirect to="/" />;
            }
        };

        return renderPage();
    };

    const mapStateToProps = createStructuredSelector({
        isAuthenticated: selectIsAuthenticated,
        user: selectCurrentUser,
    });

    return withRouter(connect(mapStateToProps)(Comp));
};

export default withPermission;

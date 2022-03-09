import { Redirect, withRouter } from "react-router-dom";
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "../../redux/user/user.selector";

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const HOC = (Component, info, OtherComponent = null, anyOf = false) => {
    const Comp = ({ isAuthenticated, user, ...otherProps }) => {
        let showMain = true;
        for (let index = 0; index < info.length; index++) {
            const element = info[index];
            console.log(element);
            if (user[element.type].includes(element.value)) {
                showMain = true;
                console.log(`${element.type},${element.value}---true`);
                if (anyOf) {
                    break;
                }
            } else {
                showMain = false;
                console.log(`${element.type},${element.value}---false`);
                if (!anyOf) {
                    break;
                }
            }
        }

        const renderPage = () => {
            // Check login status
            if (isAuthenticated) {
                // Allow all pages  if user is super admin
                if (user.type === "super-admin") {
                    return Component;
                } else {
                    // check permission
                    if (showMain) {
                        return Component;
                    } else {
                        return OtherComponent ? OtherComponent : null;
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

export default HOC;

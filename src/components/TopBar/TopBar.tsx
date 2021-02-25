import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';


function TopBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/home"><Button>Home</Button></Link>
                <Link href="/about"><Button>about</Button></Link>
            </Toolbar>

        </AppBar>
    )
}

export default TopBar;
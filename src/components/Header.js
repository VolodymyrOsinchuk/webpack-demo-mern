// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import HomeIcon from '@material-ui/icons/Home';
// import IconButton from '@material-ui/core/IconButton';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function ButtonAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//         <IconButton
//           edge="start"
//           className={classes.menuButton}
//           color="inherit"
//           aria-label="menu"
//           href="/"
//         >
//           <HomeIcon />
//         </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             React webpack
//           </Typography>
//           <Button color="inherit" href="/login">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
import React from 'react'

const Header = () => {
  return <h4>Header</h4>
}

export default Header

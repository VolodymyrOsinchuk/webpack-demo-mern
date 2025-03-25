// import React, {useState} from "react";
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import { useHistory } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const Login = () => {
//   const classes = useStyles();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   let history = useHistory();

//   const changeEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const changePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const onLogin = () => {
//     fetch("http://localhost:3000/api/login", {
//       method: "POST",
//       headers: {
//        'Content-Type':'application/json'
//       },
//       body: JSON.stringify({ email, password})
//     }).then((res) => {
//       console.log('res onLogin', res);
//       return res;
//     })
//     .catch((err) => {
//       console.error('login error is: ', err.message)
//     })
//     history.push('/profile')
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//     <CssBaseline />
//     <div className={classes.paper}>
//       <Avatar className={classes.avatar}>
//         <LockOutlinedIcon />
//       </Avatar>
//       <Typography component="h1" variant="h5">
//         Login
//       </Typography>
//       <form className={classes.form} noValidate>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           autoComplete="email"
//           autoFocus
//           value={email}
//           onChange={changeEmail}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={changePassword}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           className={classes.submit}
//           onClick={onLogin}
//         >
//           Sign In
//         </Button>
//         <Grid container>
//           <Grid item xs>
//             <Link href="#" variant="body2">
//               Forgot password?
//             </Link>
//           </Grid>
//           <Grid item>
//             <Link href="/register" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   </Container>
//   );
// };

// export default Login;

import React from 'react'

const Login = () => {
  return <div>Login</div>
}

export default Login

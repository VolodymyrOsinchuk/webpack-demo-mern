// import React, { useState } from 'react';
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

// // const {REACT_APP_URL} = process.env.REACT_APP_URL;
// // console.log('URL', URL)

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
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function Register() {
//   const classes = useStyles();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   let history = useHistory();

//   const changeUsername = (event) => {
//     setUsername(event.target.value);
//   };

//   const changeEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const changePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const onRegister = () => {
//     fetch("http://localhost:3000/api/register", {
//       method: "POST",
//       headers: {
//        'Content-Type':'application/json'
//       },
//       body: JSON.stringify({username, email, password})
//     }).then((res) => {
//       console.log('res onRegister', res);
//       return res;
//     })
//     .catch((err) => {
//       console.error('onregister error is: ', err.message)
//     })
//     history.push('/login')
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Register
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="Username"
//                   autoComplete="username"
//                   value={username}
//                   onChange={changeUsername}
//                 />
//               </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 label="Email Address"
//                 autoComplete="email"
//                 value={email}
//                 onChange={changeEmail}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={changePassword}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={onRegister}
//           >
//             Sign Up
//           </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link href="login" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </Container>
//   );
// }

import React from 'react'

const Register = () => {
  return <div>Register</div>
}

export default Register

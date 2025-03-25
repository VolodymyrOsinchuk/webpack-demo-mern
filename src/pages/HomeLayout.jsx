import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default HomeLayout

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import {
//   Box,
//   Container,
//   AppBar,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material'
// import { useTheme } from '@mui/material/styles'

// const HomeLayout = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

//   const menuItems = ['Home', 'About', 'Contact']

//   const drawer = (
//     <Box sx={{ width: 250 }}>
//       <List>
//         {menuItems.map((text) => (
//           <ListItem button key={text}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   )

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             My App
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ display: 'flex', flex: 1 }}>
//         {!isMobile && (
//           <Drawer
//             variant="permanent"
//             sx={{
//               width: 250,
//               flexShrink: 0,
//               '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
//             }}
//           >
//             {drawer}
//           </Drawer>
//         )}

//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
//           <Outlet />
//         </Container>
//       </Box>

//       <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
//         <Typography variant="body2" color="text.secondary" align="center">
//           © {new Date().getFullYear()} My Company
//         </Typography>
//       </Box>
//     </Box>
//   )
// }

// export default HomeLayout

Quick setup — if you’ve done this kind of thing before
or
git@github.com:VolodymyrOsinchuk/webpack-demo-mern.git
Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and .gitignore.

…or create a new repository on the command line
echo "# webpack-demo-mern" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:VolodymyrOsinchuk/webpack-demo-mern.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin git@github.com:VolodymyrOsinchuk/webpack-demo-mern.git
git branch -M main
git push -u origin main

    "build": "rm -rf dist && webpack --config webpack.config.js",
    "start": "node server/index.js",
    "server": "nodemon server/index.js",
    "build": "rm -rf dist && webpack",
    "dev": "webpack serve --open && nodemon server/index.js",
    "watch": "webpack --watch",
    "start-client": "webpack serve --open"



        "start": "node server/index.js",
    "server": "nodemon server/index.js",
    "build": "webpack",
    "dev:client": "webpack serve --open",
    "dev:server": "nodemon server/index.js",
    "watch": "webpack --watch"

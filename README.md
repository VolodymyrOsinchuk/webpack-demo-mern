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

Debug this error

500 FUNCTION_INVOCATION_FAILED

Request ID: cdg1:cdg1::gjbsr-1795517629340-2076442165bb
URL: https://webpack-demo-mern-i8tsn5b8n-volodymyrosinchuks-projects.vercel.app/
User agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36
Docs for this error code: https://vercel.com/docs/errors/function_invocation_failed

To inspect runtime logs for this request with the Vercel CLI, run:
vercel logs --request-id cdg1:cdg1::gjbsr-1795517629340-2076442165bb

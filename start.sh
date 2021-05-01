#!/usr/bin/env bash

# start both the react dev server and the electron window in dev mode
echo "This is spawning two separate processes. One for the electron window and one for the React dev server."
echo "When the package is built (\"npm run electron-pack\") they are combined into one"

# make sure the electron process is started in development mode so that it tries to react the react server instead of a build
react-scripts start & NODE_ENV=development electron . & fg

# do some cleanup if the processes didn't exit correctly
proc=$(lsof -t -i :3000 -s TCP:LISTEN)
if [ $proc 0= "" ]
then
  exit 0
fi

read -p "It looks like the React dev server didn't shut down correctly. Kill it? <y/N> " prompt
if [[ $prompt == "y" || $prompt == "Y" || $prompt == "yes" || $prompt == "Yes" ]]
then
  kill $proc
else
  exit 0
fi

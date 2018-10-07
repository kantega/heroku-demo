# Fork and clone the repository from github
Go to https://github.com/kantega/heroku-demo and fork the repo into your personal account. 
Then, clone the repository from your fork: 

    $ git clone git@github.com:<username>/heroku-demo.git

# Create an app

    $ heroku apps:create --region eu kantega-heroku-demo-dev
    $ git push heroku
    
    Counting objects: 18, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (18/18), done.
    Writing objects: 100% (18/18), 173.15 KiB | 6.41 MiB/s, done.
    Total 18 (delta 0), reused 0 (delta 0)
    remote: Compressing source files... done.
    remote: Building source:
    remote:
    remote: -----> Node.js app detected
    remote:
    remote: -----> Creating runtime environment

    ...
    
    remote: -----> Launching...
    remote:        Released v3
    remote:        https://kantega-heroku-demo-dev.herokuapp.com/ deployed to Heroku
    remote:
    remote: Verifying deploy... done.
    To https://git.heroku.com/kantega-heroku-demo-dev.git
     * [new branch]      master -> master


# Create a pipeline

    $ heroku pipelines:create --app kantega-heroku-demo-dev --stage development kantega-heroku-demo

Try it out by visiting https://kantega-heroku-demo-dev.herokuapp.com/ - You should see a spinning
react logo. 

# Create an app for the staging stage
    $ heroku apps:create --region eu kantega-heroku-demo-staging
    $ heroku pipelines:add --app kantega-heroku-demo-staging --stage staging kantega-heroku-demo

# Promote the development app to staging

    $ heroku pipelines:promote --app kantega-heroku-demo-dev

Visit https://kantega-heroku-demo-staging.herokuapp.com/ to see your staging app

# Edit a file and push to development
    
Make a small change to src/App.js

    $ vim src/App.js

Then commit and push to heroku. You are now pushing to the development version, since heroku apps:create
created the heroku remote for you, and subsequent calls to heroku apps:create does not overwrite that. 

    $ git add .
    $ git commit -m "ove was here"
    $ git push heroku

Then, reload https://kantega-heroku-demo-dev.herokuapp.com/ - You should be able to see your changes. 
Also, reload https://kantega-heroku-demo-staging.herokuapp.com/ and observe that the changes are not there.

# Promote the development app to staging again

Bring the heroku console into view, and execute 

    $ heroku pipelines:promote --app kantega-heroku-demo-dev

# Exercise: Production

Create a production app, connect it to the pipeline and promote staging to production. 

# Connect to github

Bring up the Heroku console, and observe the following banner on top: 

"Connect this pipeline to GitHub to enable additional features such as review apps, 
automatic deploys, and Heroku CI"

Click "Connect to GitHub" to do just that. Enter heroku-demo as the name of the repository to connect
to, and return to the pipeline view. 

# Enable automatic deployment

In trunk-based development, it is considered a best practice to always keep the master branch deployed
to the development environment. To set it up so that Heroku automatically deploys master to the development
stage, click the arrow next to "kantega-heroku-demo-dev" and select "Configure automatic deploys...". Choose
the master branch, and click "Enable Automatic Deploys". 

Now, make a small change to src/App.js, save and push to github. 






# Clone the repository from github
    $ git clone git@github.com:kantega/heroku-demo.git

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

# Create an app for the staging stage
    $ heroku apps:create --region eu kantega-heroku-demo-staging
    $ heroku pipelines:add --app kantega-heroku-demo-staging --stage staging kantega-heroku-demo

# Promote the development app to staging

    $ heroku pipelines:promote --app kantega-heroku-demo-dev



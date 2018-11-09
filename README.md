# Introduction to team workflow with Heroku Pipelines

In this workshop you will learn how to work together as a team on the same code base. 
You will be performing the daily tasks of solving user stories, creating pull requests, reviewing
each other's work and doing continuous integration. You will learn how to do continuous deployment 
to staging and production, and learn the basics of keeping a development, staging and production 
environment. For the purposes of this introduction, we'll be using Heroku pipelines. 

In this workshop, you will work together as a team of four people, each working on the 
same code base and frequently reviewing and integrating your teammates' work. 

To get you started, we've created a sample application and hosted it on our github.
You can fork this repository into your own account. Let's get cracking!

## Fork and clone the repository from github
Go to https://github.com/kantega/heroku-demo and fork the repo into your personal account. 
Then, clone the repository from your fork: 

    $ git clone https://github.com/<username>/heroku-demo.git

## Create an app

    $ cd heroku-demo
    $ heroku apps:create --region eu <username>-heroku-dev
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
    remote:        https://<username>-heroku-dev.herokuapp.com/ deployed to Heroku
    remote:
    remote: Verifying deploy... done.
    To https://git.heroku.com/<username>-heroku-dev.git
     * [new branch]      master -> master


## Create a pipeline

    $ heroku pipelines:create --app <username>-heroku-dev --stage development <username>-heroku

Try it out by visiting https://<username>-heroku-dev.herokuapp.com/ - You should see a spinning
react logo. 

## Create an app for the staging stage
    $ heroku apps:create --region eu <username>-heroku-staging
    $ heroku pipelines:add --app <username>-heroku-staging --stage staging <username>-heroku

## Promote the development app to staging

    $ heroku pipelines:promote --app <username>-heroku-dev

Visit https://<username>-heroku-staging.herokuapp.com/ to see your staging app

## Edit a file and push to development
    
Make a small change to src/App.js

    $ vim src/App.js

Then commit and push to heroku. You are now pushing to the development version, since heroku apps:create
created the heroku remote for you, and subsequent calls to heroku apps:create does not overwrite that. 

    $ git add .
    $ git commit -m "ove was here"
    $ git push heroku

Then, reload https://<username>-heroku-dev.herokuapp.com/ - You should be able to see your changes. 
Also, reload https://<username>-heroku-staging.herokuapp.com/ and observe that the changes are not there.

## Promote the development app to staging again

Bring the heroku console into view, and execute 

    $ heroku pipelines:promote --app <username>-heroku-dev

## Exercise: Production

Create a production app, connect it to the pipeline and promote staging to production. 

## Connect to github

Bring up the Heroku console, and observe the following banner on top: 

"Connect this pipeline to GitHub to enable additional features such as review apps, 
automatic deploys, and Heroku CI"

Click "Connect to GitHub" to do just that. Enter heroku as the name of the repository to connect
to, and return to the pipeline view. 

## Enable automatic deployment

In trunk-based development, it is considered a best practice to always keep the master branch deployed
to the development environment. To set it up so that Heroku automatically deploys master to the development
stage, click the arrow next to "<username>-heroku-dev" and select "Configure automatic deploys...". Choose
the master branch, and click "Enable Automatic Deploys". 

Now, make a small change to src/App.js, save and push to github. After a few seconds. you should see
"Building app" in the Heroku console. 

## Enable Review Apps

Heroku can automatically deploy any pull requests you make on github. This enables anyone who is reviewing
your pull request to see the changes in action. In the Heroku console, click "Enable Review Apps...". 

Heroku will ask you for a parent app to copy settings from. Select "<username>-heroku-dev" and click
"Create an app.json file". You can review the settings it proposes, and select "Commit to repo". Then, 
select "<username>-heroku-dev" as the app to inherit config vars from, and finally 
check the box next to "Create new review apps for new pull requests automatically". Click "Enable" to 
save your changes. 

You should now see a message saying "There are no open pull requests on <username>/heroku". 

## Create a pull request

Since you committed a new app.json file in the previous step, you need to pull that commit before
carrying on. 

    $ git pull 

Then, create a branch with some changes

    $ git checkout -b my-pr-1
    $ vim src/App.js # make some changes
    $ git commit -a -m "I made some changes"
    $ git push -u origin my-pr-1

Now you can create a pull request from your branch.
Make sure you select your own master branch as the base, otherwise the pull request will be made 
against the repository you forked from, and that repository is not connected to your heroku. 

Visit this URL to create the pull request:
https://github.com/<username>/heroku-demo/pull/new/my-pr-1

Then, head back to the heroku console, where you should find that Heroku is already busy building
and deploying an app for your pull request. 

## Merge pull request

Head on over to github and approve and merge the pull request. Heroku will immediately remove the
review app. Since you also configured automatic deployments to development, you will also see a progress 
indicator next to "Building app" in the development stage. 

## Exercise: Enable Heroku CI

You can enable Heroku CI to run your tests automatically after every push. This is left as an
exercise to the reader. 


Happy hacking!





# Team workflow with GitHub and Heroku Pipelines

If you are on a team of a few people and you are working together on a product,
you will sooner or later need to integrate each team member's work with that
of the other team members. You will likely also have a customer who wants to
see progress and try out what you're making before releasing a new version to
the end-users. This likely means you'll need to keep several versions of your
project running at all times.

Different teams choose different strategies, but in
this workshop we will teach you a basic technique which is useful in most small
projects.

To get you started, we've set up a small project for you.

## Prerequisites

You need to create a user at GitHub

Before you start, you need to:
- [Sign up for GitHub](https://github.com/join)
- [Sign up for Heroku](https://signup.heroku.com)
- [Install git](https://git-scm.com/downloads)
- [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

If you run into problems pushing to github or heroku using https, you may also want to:
- [Add your SSH key to GitHub](https://help.github.com/articles/connecting-to-github-with-ssh)
- [Add your SSH key to Heroku](https://devcenter.heroku.com/articles/keys)

## Keep Heroku Dashboard open in a browser

It's useful to keep a browser pointed at
[the Heroku dashboard](https://dashboard.heroku.com) at all times during
the workshop. Most of the commands you execute in the terminal will
trigger an immediate response in the Heroku Dashboard, so you'll know
you're doing it right. If you're not particularly keen on writing lots
of commands, you can also do most of the things by using the Heroku
Dashboard user interface.

## About the command line examples

All the commands in this workshop are shown as they appear on a unix
console:

    $ echo Hello, World!
    Hello, World!

You're not supposed to write the `$` character - that's part of the prompt.
If you're on a Windows computer, you may be used to seeing it like this:

    C:\> echo Hello, World!
    Hello, World!

If we want you to replace part of the command with something else,
we'll enclose that in angle brackets like so:

    $ echo Hello, <username>!

and then you're supposed to write

    $ echo Hello, monty!

(if your username is monty). Don't include the brackets.


All good? Let's start!

## Task 1: Clone the repository from github
Go to https://github.com/kantega/heroku-demo and clone the repository to your computer. 
*Do not fork the repo, because this will complicate pull requests later in the tutorial*

    $ git clone https://github.com/kantega/heroku-demo.git
    $ cd heroku-demo

Then, head on over to https://github.com and create a new repository called `heroku-demo`
on your own account. Once the repository is created, type the following commands to connect
your local repository to github. 
 
    $ git remote remove origin
    $ git remote add origin git@github.com:<username>/heroku-demo.git
    $ git push --force -u origin master

Now you've got an independent copy of the repository on your github account, and you're
ready to start doing exercises. 

## Task 2: Deploy the app on Heroku

Now you have the demo app git repository on your own computer. It's time
to launch it on your own personal Heroku cloud. After doing this, you'll
be able to open the app in your browser and see it running.

*Note* Heroku apps must have unique names, since they're available as
a URL on the Internet. To avoid naming conflicts, please add your
github username to the name of the apps you create in this workshop.

*It is important that you are now in the `heroku-demo` directory*.
Change directory to `heroku-demo` if you have not already done so.

    $ heroku apps:create --region eu <username>-heroku-dev
    $ git push heroku
    
	Counting objects: 50, done.
	Delta compression using up to 8 threads.
	Compressing objects: 100% (49/49), done.
	Writing objects: 100% (50/50), 1.71 MiB | 1.30 MiB/s, done.
	Total 50 (delta 12), reused 0 (delta 0)
	remote: Compressing source files... done.
	remote: Building source:
	remote:
	remote: -----> Node.js app detected
	
    [...] 
	
    remote: -----> Build succeeded!
	remote: -----> Discovering process types
	remote:        Procfile declares types -> web
	remote:
	remote: -----> Compressing...
	remote:        Done: 19.1M
	remote: -----> Launching...
	remote:        Released v3
	remote:        https://oven-heroku-dev.herokuapp.com/ deployed to Heroku
	remote:
	remote: Verifying deploy... done.
	To https://git.heroku.com/oven-heroku-dev.git
	 * [new branch]      master -> master

You should now see an app in the Heroku Dashboard. You may need to
refresh the page. Use the dashboard to open the app (there's a button
in the upper right corner that says "Open app"), and you should see a
beautiful unicorn.


## Task 3: Create a pipeline

Now that you have an app, you can add it to a pipeline. A pipeline is where you
keep your development, staging and production apps.

Create a pipeline called `<username>-heroku`. Add the `<username>-heroku-dev` app
you just created to the development stage of the pipeline. 

Use this command: 

    heroku pipelines:create --app <app name> --stage <development|staging|production> <pipeline name>

You should see something like this:

    Creating oven-heroku pipeline... done
    Adding ⬢ oven-heroku-dev to oven-heroku pipeline as development... done

And the Heroku Dashboard should look something like this:

![Dev app](dev-app.png)


## Task 4: Create an app for the staging stage

To be able to keep a separate environment for development and testing purposes,
you'll need to create another app. This is often referred to as a "staging" app.
It's mainly used as a preview of what will be deployed to production.

It helps to add `-staging` to the end of the app name to keep the apps apart. 

Use these commands: 

    heroku apps:create (you know this one already)
    heroku pipelines:add --app <app name> --stage <stage name> <pipeline name>

Afterwards, the Heroku Dashboard should look something like this:

![Staging app](staging-app.png)

## Task 5: Promote the development app to staging

At the moment, there's nothing running on the staging app. You need to
deploy something. You've already created, compiled and run a development
version of your app. To copy that (without rebuilding), you can simply
promote the app from the development stage to the staging stage.

You can promote the development app through the heroku dashboard, or you can use 
this command: 

    heroku pipelines:promote --app <app name>

## Task 6: Make a small change to the app, and push to heroku
    
Make a small change to `public/index.html`. You can use any editor you like. 

Then commit to git and push to heroku. You are now pushing to the development version, since heroku apps:create
created the heroku remote for you, and subsequent calls to heroku apps:create does not overwrite that. 

    $ git add .
    $ git commit -m "ove was here"
    $ git push heroku

Check to see that your changes were deployed to the development app. Also check the staging app and observe
that your changes are *not* there. 

## Task 7: Promote the development app to staging again

You've now completed development of your new feature, and you'd like to share it
with your customer. To do this, you promote the app again, like you did before.

## Task 8: Production

Create a production app, connect it to the pipeline and promote staging to production. 

## Task 9: Connect to github

To enable automatic deploys when someone on the team pushes to github, we need to connect Heroku to github
and enable automatic deploys. 

Bring up the Heroku console, and observe the following banner on top: 

"Connect this pipeline to GitHub to enable additional features such as review apps, 
automatic deploys, and Heroku CI"

Click "Connect to GitHub" to do just that. Enter `heroku-demo` as the name of the repository to connect
to, and return to the pipeline view. 

## Task 10: Enable automatic deployment

It is considered a best practice to always keep the master branch deployed
to the development environment. To set it up so that Heroku automatically deploys master to the development
stage, go to the Heroku Dashboard, click the arrow next to "<username>-heroku-dev" and select "Configure automatic deploys...". Choose
the master branch, and click "Enable Automatic Deploys". 

Now, make a small change to your app, commit and push to *github* (not to heroku). After a few seconds. you should see
"Building app" in the Heroku console. 

## Task 11: Enable Review Apps

Heroku can automatically deploy any pull requests you make on github. This enables anyone who is reviewing
your pull request to see the changes in action. In the Heroku console, click "Enable Review Apps...". 

Heroku will ask you for a parent app to copy settings from. Select "<username>-heroku-dev". This will make 
sure that any settings made to the development app are also made to the review apps. 

Make sure to check the box next to "Create new review apps for new pull requests automatically". Click "Enable" to 
save your changes. 

You should now see a message saying "There are no open pull requests on `<username>/heroku-demo`". 

## Task 12: Create a pull request

When working with pull requests, you must create a branch, commit some changes to that branch and push the branch
to github. You're then able to create a pull request from the branch, which is basically the same as 
requesting a code review from your team mates. If your team mates approve of your changes, you can merge the pull
request. Your changes will then be part of the master branch.  

- Create a new branch and make some changes to the code. Maybe replace the picture of the unicorn with a cat 
  (or something else, if you like), change the background color, add some more content, or whatever you like. 
- Create a pull request from your new branch 

Tip: use `git push -u` when pushing your branch to github for the first time.

Then, head back to the heroku console, where you should find that Heroku is already busy building
and deploying an app for your pull request. 

## Task 13: Inspect and review the pull request

Now you're ready to do a proper code review. Look to the person sitting next to you, and go through
the pull request on GitHub together. Demonstrate the changes by pulling up your review app in the
browser, and show how the running review app differs from the running development version.

## Task 14: Merge pull request
When you've done the code review, head on over to github and approve and merge the pull request. Heroku will immediately remove the
review app. Since you also configured automatic deployments to development, you will also see a progress 
indicator next to "Building app" in the development stage. 

When this is done, you can refresh the development app, and you should see that your changes have been published. 

## Final task: Promote to production
You've now set up the entire pipeline and finished one new feature. You can now promote the development version 
of your app to staging, let the person next to you try it out by giving them the staging URL, and finally 
promote staging to production.

Happy hacking!





# Git - Introduction

## Motivations

Basic issues:
* important files accidentally deleted
* need to recover code from an older version
* hard disk crash
* computer theft
* ...

Naive solutions:
* copy to another folder, but need to update the old one or recreate a new one for each modification
* send versions by e-mail or USB key

=> loss of chronology, files/folders with the same name...etc 

## Git: basic concepts

Each git project contains:
* working folders/files
* a .git folder (containing the history or repository)

### Basic operations

Project initialization :
* git clone ssh:// ou https://: clones a repository locally on your machine
* git pull: retrieves the latest updates 

Ongoing project:
* git status: shows the status of the repository in relation to the local version
* git commit: creates a new revision in the repository
* git pull: retrieves the latest updates 
* git push: push the latest updates to the repository
* git add, git rm, git mv: adds new files, deletes files, moves files

See the history:
* gitk: visual overview of all actions performed on the repository

Managing a project shared by several persons:
A global repository is created and then each sub-section can be divided into branches.


## Some guidelines

* Do not modify the same piece of code at the same time
* Try to work on separate files if possible
* Avoid using other delivery methods in addition to Git

## Tips for the ideal use of Git

* git add fichier1 fichier 2.. (the files that have been modified) 
* git commit -m "message to specify what has been changed"
* git pull following git commit for an automatic and not manual merge
* git push to send the changes

(Make sure the code executes correctly before pushing its work)


## Git installation

git --version to check if a version is already installed on your machine

### Linux
sudo apt-get update sudo apt-get install git

sudo dnf install git Sudo yum install git

### Windows

https://gitforwindows.org/

### Mac

https://sourceforge.net/projects/git-osx-installer/files/


### Websites/Software using git
* GitLab: open-source ressource for private projects
* GitHub: open-source ressource for public & private projects
* GitKraken: git-based project management software

load 'deploy' if respond_to?(:namespace) # cap2 differentiator

set :application, 'rushbean'
set :deploy_to, "/var/www/rushbean/"

set :scm, :none
set :repository, "."
set :deploy_via, :copy 
set :copy_compression,    :gzip 

set :user, "grzech"
set :use_sudo, false

#set :scm, "git"
#set :repository, "ssh://rushbean.com/var/git/rushbean.git"
#set :branch, "master"
#set :git_shallow_clone, 1
#set :deploy_via, :remote_cache

default_run_options[:pty] = true 

server "rushbean.com", :app, :web, :db, :primary => true

namespace :deploy do
  #task :start do ; end
  #task :stop do ; end
  task :migrate do ; end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(deploy_to, 'current/tmp','restart.txt')}"
  end
end


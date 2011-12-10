require 'sinatra'
require 'sinatra/r18n'
require 'sass'
require 'json'


get '/' do
  haml :index 
end

get '/style.css' do
  scss :style, :style => :compact
end

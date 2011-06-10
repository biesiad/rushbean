require 'sinatra'
require 'sinatra/r18n'
require 'sass'
require 'json'


get '/' do
  haml :index 
end

post '/' do
  name = params[:name]
  email = params[:email]
  message = params[:message]
begin
  send_status = "ok"
  msg = "The message has been sent, thank you!"
  file = File.new("messages.txt", "a")
  file.write("---\n")
  file.write("#{name} <#{email}>\n#{message}\n")
  file.close
rescue => e
  send_status = "error"
  msg = "Something went wrong.<br/> Please, try again after a while."
  puts e.message
end
  { :class => send_status, :msg => msg }.to_json
end

get '/style.css' do
  scss :style, :style => :expanded
end

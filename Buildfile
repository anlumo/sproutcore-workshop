# ===========================================================================
# Project:   Chat
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# This is your Buildfile, which sets build settings for your project.
# For example, this tells SproutCore's build tools that your requires
# the SproutCore framework.
config :all, :required => [:sproutcore, "sproutcore/statechart", :strophe]

proxy '/http-bind', :to => '10.0.1.3:7070'

# In addition to this Buildfile, which gives settings for your entire project,
# each of your apps has its own Buildfile with settings specific to that app.

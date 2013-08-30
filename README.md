bstack-server
=============

Node.js based browser stack server

Steps to use:
1. Install all the dependencies buy running npm install in root folder of project.
2. To start server call node bstack_server.js
3. For server commands please see bstack_server.js description. (Actually those should be added here, will do that afterwards)

# To setup launchd service on Mac os x
1. Change the location pointing to bstack_server.js in com.bstack.bstack-server.plist.
2. Copy the com.bstack.bstack-server.plist file from bstack-server folder to ~/Library/LaunchAgents/
3. Copy the com.bstack.bstack-proxy.plist, com.bstack.ssh-one.plist and com.bstack.ssh-two.plist to /Library/LaunchDaemons/
4. Next, either restart your computer or use launchctl load <name of plist file> to start the service. All these services are configured to live on by default.
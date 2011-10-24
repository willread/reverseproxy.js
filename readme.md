Firewalls
---------

If you wish to keep your services behind a firewall, such as iptables, you'll need to make sure to bind your services to an internal interface, like so: 

```service.start(port, "localhost")```.

Non-root
--------

It's never a good practice to run network services as the root user but you will run into operating system restriction of available ports when running as a non-root account in many environments.

For the example proxy provided we use port 8080 on the internal interface to get around this restriction. 

You'll need to do something to redirect traffic from port 80 on the external interface to our proxy on port 8080. 

If your system has ```iptables``` you can do something like this: 

```iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080```

Running as a service
--------------------

What happens when you want to make sure your proxy stays up, no matter what?

There are lots of options here, including the excellent Forever:

```
$ npm install forever
$ forever start service.js
```

If you're working in a Debian-based environment, add a file called ```proxy.conf``` to ```/etc/init/``` containing something like this:

```
description "Reverse HTTP Proxy"
author      "Your Name"
 
start on started mountall
stop on shutdown

respawn
respawn limit 99 5
 
script
    export HOME="/home/node"
    exec sudo -u node /usr/bin/node /home/node/service.js >> /home/node/node.log 2>&1
end script
```

Your proxy will now be started at boot, and can also be controlled like so:

```
start proxy
stop proxy
restart proxy
```
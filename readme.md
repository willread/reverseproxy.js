Firewalls
---------

If you wish to keep your services behind a firewall, such as iptables, you'll need to make sure to bind your services to an internal interface, like so: ```service.start(port, "localhost")```.

Non-root
--------

It's never a good practice to run network services as the root user but you will run into operating system restriction of available ports when running as a non-root account in many environments.

For the example proxy provided we use port 8080 on the internal interface to get around this restriction. 

You'll need to do something to redirect traffic from port 80 on the external interface to our proxy on port 8080. 

If your system has ```iptables``` you can do something like this: ```iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080```

Running as a service
--------------------



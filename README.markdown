# Chat #
An example application written in Sproutcore
Copyright: ©2011 Andreas Monitzer

> This is an XMPP-based chat applicaton to demonstrate a very basic Sproutcore application.
> Copyright &copy; 2011 Andreas Monitzer

> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
> 
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU General Public License for more details.
> 
> You should have received a copy of the GNU General Public License
> along with this program.  If not, see <http://www.gnu.org/licenses/>.

# Basic Usage #

Chat requires Sproutcore 1.5. It was developed under 1.5.0.RC.2.

You need an XMPP server. I've tested ejabberd and OpenFire, but others should work as well. The requirements are support for MUC, BOSH and SASL ANONYMOUS (they have to be enabled as well, which is usually not the case by default for the latter two).

The server the application runs on has to respond to the BOSH requests on /http-bind/. Most likely, you'll have to implement a proxy for this. If you're using sc-server for development, the possible configuration for apache is as follows:

    ProxyPass /http-bind/ http://<ip>:<port>/http-bind/
    ProxyPass / http://localhost:4020/

Insert the BOSH-server's IP at &lt;ip&gt; and its corrsponding port at &lt;port&gt;. The sc-server is assumed to run locally.

Note that you can also use the built-in proxy support of sc-server, but due to handling only a single connection at a time, it is of very limited use for BOSH. The Buildfile includes the configuration required for that (altough you have to edit the IP-address of the server to proxy to).

# Mode of Operation #

Upon starting the web application, it immediately logs into the server using anonymous authentication. It then asks the user for a chat nick and a MUC room name. After receiving these, it logs into the chatroom and provides a very basic chatting experience.

You can enter text into the text field at the bottom, and pressing return. When pressing shift-return or using the prefix "/me ", actions (as in "bla does something" text lines) are sent instead.

# Other Licenses #

Chat includes strophe.js, which is licensed under the MIT license:

> Copyright (c) 2006-2009 Collecta, Inc.
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

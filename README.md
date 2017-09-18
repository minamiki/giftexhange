# Gift Exchange System

# Requirements
* Able to randomly assign a target receipient to a user
* Email should contain:
	- Who to gift
	- Link to see the recipients' wishlist
	- Link to fill in your own wishlist
	
# Implementation Details
* Setup Node.js Webpack environmment
* Create the email template. It should contain:
	- Greet the user (the sender)
	- Tell the user who they are giving to (the receiver)
	- Show a link to see the receiver's wish list
	- Show a link to fill in their own wish list
	- Additional details/notes on minimum gift value, rules etc	
* Module to take in an array of users and return reciever/recipient pairs (hereby known as _result_)
	- Save result into DB as reciever/recipient pairs, with date of generation, event name/id (i.e. Christmas 2017)
* Module to take in _result_ and email template and send out emails
	- Email to recipient should contain the target reciever (Who they are going to gift to)
	- A link to a permanent page (hashed id) which shows the recipient their reciever's wish list (hereby known as _wishlist_)
	- _wishlist_ which has a form for the recipient to list their wish list (form with open end text fields?)
* _wishlist_ webpage
	- Recipient view (sender):
		- Read only view of wishlist
		- [BONUS] Comments area to post an anoynomous comment on the wishlist
	- Reciever view (receiver):
		- Form field with text fields (3 default fields? with the option to add more)
		- [BONUS] Comments area to read and reply to comments from sender
* [BONUS] Administartion webpage
	- Dashboard view to checks if recievers have populated their wishlist (and item count? haha)

# Database schema
* User table (id, fullName, email)
* Event table (id, eventName, userIds?)
* Result table (id, sender, receiver, eventId, timestamp, emailSent?)
* Wishlist table (id, userId, eventId, lastUpdate)
* Wishlist Items (id, wishlistId, name, description, imageLink, urlLink)

# Bonus features
* Database to store/track reciever/recipient
* Administration Dashboard to see wishlist status (Whether user has filled in their wishlist)
* Anoynomous chat on the wishlist page for reciever/recipient to post comments
* Weighted algorithm to reduce the chance of reducing repeat reciever/recipient pairs

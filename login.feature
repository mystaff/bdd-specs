# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#


Feature: Login Authentication
		 
Scenario 1: Logging in successfully as an owner
	Given I'm an account owner
	When I submit valid "email" and "password"
	Then I should be logged in successfully 
	And taken to the "team" dashboard


Scenario 2: Logging in successfully as an admin
	Given I'm an admin
	When I submit valid "email" and "password"
	Then I should be logged in successfully 
	And be taken to the "team" dashboard

Scenario 3: Logging in successfully as a manager
	Given I'm a manager
	When I submit valid "email" and "password"
	Then I should be logged in successfully 
	And be taken to the "team" dashboard


Scenario 4: Logging in successfully as a regular user
	Given I'm a regular user
	When I submit valid "email" and "password"
	Then I should be logged in successfully 
	And be taken to my own dashboard


Scenario 5: Logging in successfully with 2FA code
	Given user is on the login page
	And 2FA is enabled
	When user submits his credentials
	And enters the 2FA code from the popup
	Then user should be logged in successfully 


Scenario 6: Logging in with invalid credentials
	When user enters invalid "email" or "password"
	And clicks "login" button
	Then screen should display an error "Invalid Email or Password"



Scenario 7: Logging in using invalid email format
	When user enters invalid email format
	Then screen should display and error "This is not a valid email"
	And "login" button should remain inactive



Scenario 8: Logging in leaving password field empty
	When user enters valid "email"
	And leaves the "password" empty
	Then an error should display under the password field saying "Please enter your password"
	And "login" button should remain inactive



Scenario 9: Logging in using wrong 2FA code
	Given user is on the login page
	When user submits valid "email" and "password"
	And enters wrong code in the 2FA popup
	Then screen should display an error "Please enter a valid 2FA code."




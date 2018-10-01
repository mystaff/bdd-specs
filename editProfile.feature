

Feature: Editing Profile


Background: 
Given user is on the Edit Profile page


Scenario 1: User successfully changes his name
	When user enters a new name on the name field
	And clicks save button
	Then new name should be saved
	And it should display "Your profile has been successfully updated!"

Scenario 2: User successfully changes password
	When user enters a new password
	And click save button
	Then new password should be saved 
	And it should display "Your profile has been successfully updated!"


Scenario 3: User successfully changes email address	
	When user enters a new email
	And user clicks save button	
	Then new email should be saved
	And it should display "Your profile has been successfully updated!"


Scenario 4: User leaves name field empty
	When user leaves the name field empty
	Then it should display an error "Please enter your name."


Scenario 5: User leaves password field empty
	When user leaves the password field empty
	Then it should display an error "Please enter your password."


Scenario 6: User leaves the email field empty
	When user leaves the email field empty
	Then it should display an error "Please enter your email."


Scenario 7: User cancels edit profile changes
	When user fills out the form
	And clicks on cancel
	Then any changes should be discarded
	User should be taken to the dashboard


Scenario 8: User successfully turns on Two-factor authentication
	When user switches to security tab
	And submits the 2FA code
	Then the 2FA should be enabled
	And page should display "You have successfully setup your two-factor authentication!"


Scenario 9: User disables Two-factor authentication
	Given user is on Security tab
	When user slides the toggle to the left
	And clicks disable button from the popup
	Then 2FA should be disabled


Scenario 10: User cancel 2FA disable pop up
	Given user is on Security tab
	When user slides the toggle to the left
	And clicks cancel button from the pop up 
	Then 2FA should remain active



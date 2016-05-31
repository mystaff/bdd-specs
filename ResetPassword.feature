# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#



Feature: Password Reset



Scenario: Successful password reset
	Given I am on "Forgot Password" page
	  And a user exist with email: "ice+tester@staff.com", password: "password"
	 When I enter my email as "ice+tester@staff.com"
	  And I click on "next"
	 Then output should say "Thank you! A password reset link has been sent to your e-mail address."
	  And an email should be sent to "ice+tester@staff.com"
	  And should contain link to reset password.
	 When I click on the "reset password link"
	 Then I should see the form to enter my new password
     When I fill in "user_password" with "some_new_password"
	  And I fill in "user_password_confirmation" with "some_new_password"
	  And click next
	 Then output should say "You've successfully reset you password"

Scenario: Reset password using unregistered email
	Given I am on "Forgot Password" page
	 When I fill in "user_email" with "unknown_email"
	  And I click on "next"
	 Then output should say "Email address not found."
	
Scenario: Leaving email field empty
	Given I am on "Forgot Password" page
	 When I leave the "user_email" as blank
	 Then output should say "Please enter your email."
	  And the "button_next" should be inactive

Scenario: Password reset link is expired
	Given I have received the reset password email
	 When user clicks the link after "30 minutes" have passed
   	 Then user is redirected to reset password page
	  And output should say "Your reset password token has already expired. Please click on here (link) to send a new reset password link."

Scenario: Password dont match requirements
	Given I am on "Forgot Password" page
	 When I fill in "user_password" with less than 6 characters such as: "q1w2"
	 Then output should say "Please enter at least 6 characters."
	
# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#



Feature: Password Reset

Scenario 1: User requesting for password reset
	Given user is at the forgot password page
	When user enters valid email
	And clicks on "Next"
	Then a reset password link is sent to the email address


Scenario 2: User successfully resets password
	Given user opens the reset password link
	And user enters a "new password"
	When user clicks "Next"
	Then password is reset


Scenario 3: User resets password using an expired link
	Given 30 minutes have passed
	And user opens the reset password link
	When user enters a "new password"
	And clicks "Next"
	Then error should be displayed "Your reset password token has expired! Click here to reset password"


Scenario 4: Resetting password using non-existent email
	Given user is at the forgot password page
	When user enter a non-existing email
	And clicks "Next"
	Then error should be displayed "Email not found!"
	
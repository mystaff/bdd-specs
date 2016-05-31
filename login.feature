# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#


Feature: Login Authentication


		 
Scenario: Succcessful login
	Given I am on login page
	 When I fill in "email" with "ice+tester@staff.com"
	  And I fill in "password" with "q1w2e3r4"
	  And I click "login"
	 Then I should be redirected to "dashboard"

Scenario: Unsuccessful login
	Given I am on login page
	 When I fill in "email" with "wrong email"
	  And I fill in "password" with "wrong password"
	  And I click "login"
	 Then I output should say "Invalid email or password"

Scenario: Logging in as unregistered user
	Given I am on login page
	 When I fill in "email" with "unregistered email"
	  And I fill in "password" with "wrong password"
	  And I click "login"
	 Then I output should say "Invalid email or password"


  Scenario: Logging in without email entered
    Given I am on the login page
      And I leave "email field" as "empty"
      And I fill in "password" with "q1w2e3r4"
     Then output should say 'Please enter your email address'

  Scenario: Logging in without password entered
    Given I am on the login page
      And I fill in 'email' with 'ice+test@staff.com'
      And I leave 'password' as 'empty'
     Then output should say 'Please enter your password'



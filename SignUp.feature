# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#


Feature: Register/Sign Up
  # This covers all scenarios that a user might face when signing up with Staff.com.
  # A user should be able to successfully create an account to be able to use the software and navigate through web interface.
  

Scenario: Register with a new account - Interactive Mode
	  Given I am on registration page
	    And I am a new user
     When i fill the form fields as follows:
            | Company Name |    Name    |     Email Address     | Password |
            | Widget Corp  | John Smith | ice+tester1@staff.com | q1w2e3r4 |
      And I click on the button 'continue'
     Then I should be redirected to the download page
     When I click on button 'interactive'
     Then download should automatically start
     When I install the application
      And I sign in to the desktop client
     Then it should detect that 'Install and Sign in: Done!'
     When I click on 'Go to your dashboard'
     Then I should be redirected to the "dashboard page"

Scenario: Register using an existing account
    Given I am a registered user
      And I fill in 'company name' with 'Widget Corp'
      And I fill in 'name' with 'John Smith'
      And I fill in 'email' with 'ice+tester1@staff.com'
     Then 'email field' should turn into red with '!' icon
     When I click the 'email field'
     Then Display 'User with this email address already exists!'

Scenario: Register with a new account - Silent Mode
	  Given I am using a windows operating system
	    And I am on registration page
	   When I fill the form fields as follows:
            | Company Name |    Name    |         Email         | Password |
            | Widget Corp  | John Smith | ice+tester1@staff.com | q1w2e3r4 |
      And I click on the button 'continue'
     Then It should display progress 'creating an account' progress
      And Redirect user to the 'download' page
     When I click the 'silent app' button
     Then download should automatically start
     When I install the desktop client
     Then Run the client silently on background
     When I click 'Go to your dashboard' 
     Then Redirect user to the dashboard

  Scenario: Register without downloading the app - interactive
      Given New user
            | company name |    name    |         email         | password |
            | Widget Corp  | John Smith | ice+tester1@staff.com | q1w2e3r4 |
       When I click on 'continue'
       Then Show 'creating an account' status
        And Redirect user to the download page
        And I click on 'interactive' download
       Then Download should automatically start
       When I cancel the download process
        And I click on 'go to your dashboard'
       Then Display pop up 'Please install the Staff.com app'

  Scenario: Register without downloading the app - silent
      Given New user
            | company name |    name    |         email         | password |
            | Widget Corp  | John Smith | ice+tester1@staff.com | q1w2e3r4 |
       When I click on 'continue'
       Then Show 'creating an account' status
        And Redirect user to the download page
        And I click on 'silent' download
       Then Download should start automatically
        And I cancel the download process
        And I click on 'go to your dashboard'
       Then Display pop up 'Please install the Staff.com app'

  Scenario: Register with invalid email address
      Given New user
        And I fill in 'company name' with 'Widget Corp'
        And I fill in 'name' with 'John Smith'
        And I fill in 'email' with 'ice+tester1.com'
       Then email field should turn into red and display '!' icon

  Scenario: Register without inputting a company name
      Given I am a new user
        And I am in the homepage
        And I leave the 'company name' field as empty " "
        And I move to the next field
       Then 'Company Name' field should turn red with '!' icon
        And Display an error 'Whats your company name'

Scenario: Register without a name
    Given I am a new user
      And I am in the homepage
     When I fill in 'company name' with 'Widget Corp'
      And I leave the 'name_field' as 'blank'
     Then 'name_field' should turn red with '!' icon
      And error should pop up 'What is your name?'

  Scenario: Register without an email
      Given I am a new user
        And I am in the homepage
        And I fill in 'company name' with "Widget Corp"
        And I fill in 'name field' as 'John Smith'
        And I leave the 'email_field' as empty " "
       Then 'email_field' should turn red with '!' icon
        And error should pop up 'What is your email address?'


  Scenario: Register without a password
      Given I am in the homepage
        And I fill in 'company name' as 'Widget Corp'
        And I fill in 'name' as 'John Smith'
        And I fill in 'email' as 'ice+tester1@staff.com'
        And I leave the 'password' as empty " "
        And I click on 'create' button
       Then 'password field' should turn red with '!' icon
        And Display error 'Enter at least 6 characters'


  Scenario: Signing up on a mobile device
      Given I am on a mobile
        And I go to the homepage
       When i fill the form fields as follows:
            | Company Name |    Name    |     Email Address     | Password |
            | Widget Corp  | John Smith | ice+tester1@staff.com | q1w2e3r4 |
        And I click on the button 'continue'
       Then display a message "To finish registering, please sign into the account you just created on a desktop computer."
       When I sign in to my computer
       Then I should be taken to the download page (step 2)
       When I download the application
        And I install it to my computer
        And I sign in to the desktop client
       Then it should detect that 'Install and Sign in: Done!'
       When I click on 'Go to your dashboard'
       Then I should be redirected to the "dashboard page"


    

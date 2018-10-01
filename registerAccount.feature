# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#


Feature: Register/Sign Up
  # This covers all scenarios that a user might face when signing up with Staff.com.
  # A user should be able to successfully create an account to be able to use the software and navigate through web interface.
  

Background:
    Given user is at the homepage


Scenario 1: User successfully creates a new interactive account (with preset tasks)
    When user submits all the required fields
    And closes the "$100 discount pop up"
    And clicks "next" in the "welcome dialog" popup
    And enables the "task feature" 
    And clicks "finish" pop up
    Then interactive account is created
    And preset tasks are created


Scenario 2: User successfully creates a new interactive account (with no tasks)
    When user submits all the required fields
    And closes the "$100 discount pop up"
    And user clicks the radio button "office"
    And clicks on "NEXT"
    And clicks on "Finish" in the next dialog pop up
    Then interactive account is created with no task


Scenario 3: User successfully creates a new silent account
    When user submits all the required fields
    And closes the "$100 discount pop up"
    And user clicks the radio button "office"
    And clicks "Don't let employees start & stop tracking"
    And clicks on "NEXT"
    And clicks on 'Finish" button
    Then silent account is created


Scenario 4: User fails to register using an existing account
      When user fills out the form and enters a "registered email"
      And clicks "Try it out"
      Then a popup should appear saying "Account already exists"


Scenario 5: User registers using wrong email format
    When user fills out the form and inputs a wrong email format
    Then email field should display an error "Please enter a valid email address"


Scenario 6: Users registers with password less than 6 characters
    When user fills out the form and inputs password less than 6 characters
    Then password field should display an error "Enter a password of at least 6 characters"


Scenario 7: Users registers with missing Company Name
    When user fills out the form and leaves the company field as empty
    Then company field should display an error "What's your company's name?"


Scenario 8: Users registers with missing Name
    When user fills out the form and leaves the name field as empty
    Then name field should display an error "What's your name?"



Scenario 9: Users registers with missing email
    When user fills out the form and leaves the email field as empty
    Then email field should display an error "Please enter a valid email address"


Scenario 10: Users registers with missing password
    When user fills out the form and leaves the password field as empty
    Then password field should display an error "Enter a password of at least 6 characters"
    
    


    

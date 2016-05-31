
# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#

Feature: Accept Invitation


Background:
    Given user receives an invite to join company


Scenario: Accepting and activating account successfully 
     When user clicks on invite link
     Then user should be taken to the invite activation page
     When user fills in "password_field" with "q1w2e3r4"
      And user fills in "confirm_password" with "q1w2e3r4"
      And user clicks "next"
     Then redirect user to the download page
      And download should be automatically started
     When user installs the application
      And login to the app
     Then download and installation status should say "Installation and sign in is done"


Scenario: Accepting and Skipping download - admin user & manager level
    Given company admin invites someone with "admin" access level
     When user clicks on invite link
     Then user should be taken to the invite activation page
     When user fills in "password_field" with "q1w2e3r4"
      And user fills in "confirm_password" with "q1w2e3r4"
      And user clicks "next"
     Then redirect user to the "download page"
     When user clicks on 'Go to your dashboard'
     Then it should bring up a pop up with "skip" button
     When user clicks on "skip" button
     Then user should be redirected to the "dashboard page"


Scenario: Existing user from other company accepts invitation
    Given user has an existing company
     When user clicks on invite link
     Then user should be redirected to download and installation "Step 2"
     When user logs in to the application
     Then it should bring up the "company_selection" pop up
     When user selects the "new_company" from the list
     Then download and installation status should say "Installation and sign in is done"
     

Scenario: Clicking on invite link when you already have activated the account
    Given user has already activated his account
     When user clicks again on the invite link
     Then redirect user to the login page
      And display output "It looks like you've already accepted the invitation. Please log in to go to your dashboard."


Scenario: Clicking on invite link when user has been deleted
    Given user receives an invite email
      And company admin deletes the user in manage user settings
     When user clicks on the invite link
     Then redirect user to the page and display output "Sorry, your invitation token has expired."

Scenario: Regular user clicks go to dashboard without downloading the app
    Given company admin invites someone with "regular user" access level
     When user clicks on "invite" link
     Then user is redirected to the "invite activation" page
     When user enters his password "q1w2e3r4"
      And reenters his password correctly "q1w2e3r4"
      And user clicks on "next" button
     Then redirect user to the "download page"
     When user clicks on 'Go to your dashboard' without downloading the app
     Then it should bring up the notification pop up without the "skip" option
     

Scenario: When password entered dont seem to match
     When user clicks on invite link
     Then user should be taken to the invite activation page
     When user fills in "password_field" with "q1w2e3r4"
      And user fills in "confirm_password" with "q1w2e3"
     Then display error "Passwords don't match!""
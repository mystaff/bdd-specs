# Created with BDD Editor on: 10 May, 2016
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#



Feature: Invite Feature

Background:
    Given I set my workspace setting to interactive
      And I am on invite page

Scenario: Inviting new users successfully
     When I fill in the form fields as follows:
          |    Name    |     Email Address     | 
          | John Smith | ice+tester@staff.com | 
      And I set the screenshot interval to its default value which is "15 min"
      And I set the inactive time to its default value which is "15 min"
     When I click on 'send' button
     Then display output "Your invitation has been sent successfully"

Scenario: Inviting someone from same workspace
      And a user exist with email: "ice+tester@staff.com"
     When I enter email as "ice+tester@staff.com"
      And I set the screenshot interval to "value"
      And I set the inactive time to "value"
     Then 'send' button should become active
     When I click on 'send' button
     Then display output "Invitation not sent because {email} is already part of this workspace"

Scenario: Inviting a deleted user from workspace
      And a user with email: "ice+tester@staff.com" is deleted from workspace
     When I enter email as "ice+tester@staff.com"
      And I set the screenshot interval to "value"
      And I set the inactive time to "value"
     Then 'send' button should become active
     When I click on 'send' button
     Then display output "Your invitation has been sent successfully"

Scenario: Inviting someone who is part of another company
     And a user with email: "ice+tester@staff.com" exist in other company
    When I enter email as "ice+tester@staff.com"
     And I set the screenshot interval to "value"
     And I set the inactive time to "value"
    Then 'send' button should become active
    When I click on 'send' button
    Then display output "Your invitation has been sent successfully"

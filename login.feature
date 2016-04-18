Feature: Log-in

  Scenario: Logging in using an existing account
    Given I am a registered user
    And I am on the login page
    And I have only one company
    And I have only one workspace
    When I enter my credentials
      |         email         | password |
      | ice+tester1@staff.com | q1w2e3r4 |
    And I click button 'LOGIN'
    Then dashboard page should be loaded.

  Scenario: Logging in into the system when you have multiple companies and workspaces
    Given I am a registered user
    And I am on the login page
    And I have multiple companies
    And I have multiple workspaces
    When I enter my credentials
      |         email         | password |
      | ice+tester1@staff.com | q1w2e3r4 |
    And I click on 'login' button
    Then It should redirect me to company page selection
    When I click 'Company A'
    Then It should bring up the  'workspace selection' pop up
    When I click on 'Workspace A'
    Then I should be taken to the selected company and workspace

  Scenario: Logging in with unregistered email
    Given I am not registered yet
    And I am on the login page
    When I enter my credentials
      |             email              | password |
      | ice+unregistereduser@staff.com | q1w2e3r4 |
    And click button 'LOGIN'
    Then output should say 'Invalid email or password'.

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

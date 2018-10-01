Feature: Inviting new users in Interactive Workspace


Background:
	Given I'm logged in as a company owner

Scenario 1: Successfully inviting new users
	When I fill out all required fields
	And click "send" button
	Then invite link should be sent successfully
	And a message is shown on screen "Your invitation has been sent successfully!"
	And user should receive the invite link


Scenario 2: Inviting an existing user
	When I invite an existing user
	And click on "send" button
	Then error should display "Invitation not sent because {email} is already part of this workspace"


Scenario 3: Inviting someone from another company
	When I invite a user who is part of another company
	And click on "send" button 
	Then invite link should be sent successfully
	And a message is shown on screen "Your invitation has been sent successfully!"
	And user should receive the invite link

	
	

Feature: Adding a payment method.



Background:
	Given I'm logged in as a company owner
	And I'm on the billing page

Scenario 1: Successfully adding payment method
	When I enter all required fields
	And submit the form
	Then I should see a message "You've successfully added your payment method"


Scenario 2: Adding payment method with expired credit card
	When I submit the form with expired credit card
	Then I should see error "Please enter a valid expiration date."


Scenario 3: Adding payment method with invalid CVC
	When I fill out the form 
	And enter an invalid CVC
	Then an error should be displayed under the CVC field saying "Please enter a valid CVC number."
	And submit button should remain disable

Scenario 4: Adding payment method with invalid credit card number
	When I fill out the form 
	And enter an invalid credit card number
	Then an error should be displayed under the credit card number field saying "Please enter a valid credit card number."
	And submit button should remain disable

Scenario 5: Adding payment method without inputting the card holder name
	When I fill out the form
	And I leave the name field blank
	Then an error should be displayed under the name field saying "This field is required."

	
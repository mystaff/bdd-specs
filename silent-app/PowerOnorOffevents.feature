#
# Feature: Power On or Off events
#
# Created with BDD Editor on: 13 August, 2019
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#

@Power-on-off 
Feature: Power On or Off events
  These are shut down and restart events

  @power-on-mode 
  Scenario: 1. Test Silent app when the laptop is in Power On mode
    Given Install Silent app on Windows OS
    When User turn on laptop
    And started working on it
    Then Silent app should start tracking time

  @power-off-mode 
  Scenario: 2. Test Silent app when the laptop is in Power Off mode 
    Given Install Silent app on Windows OS
    When User click on windows key
    And Click on shut down option
    Then Silent app should stop tracking time

  @power-off-mode 
  Scenario: 3. Test Silent app when the laptop is in Power Off mode
    Given Install Silent app on Windows OS
    When User clicks 'ALT+CONTROL+DELETE' buttons together on keyboard
    And Click on shut down option on the screen
    Then Silent app should stop tracking time

  @Restart 
  Scenario: 4. Test Silent app when the laptop is suddenly restarted 
    Given Install Silent app on Windows OS
    When User is working on laptop
    And laptop restarted suddenly
    Then Silent app should stop tracking time
    And Start tracking time after laptop starts again

  @Low-battery 
  Scenario: 5. Test Silent app when the battery is less than 5%
    Given Install Silent app on Windows OS
    When User is working on laptop
    And laptop turn off due to no battery
    Then Silent app should stop tracking time
